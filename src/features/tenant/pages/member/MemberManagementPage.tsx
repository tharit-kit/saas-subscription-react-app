import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./MemberManagementPage.css";
import { useLoaderData } from "react-router-dom";
import type { getMemberListLoader } from "../../loaders/getMemberListLoader";
import { useInviteMember } from "../../hooks/useInviteMember";
import type { InviteMemberRequest } from "../../interfaces/MemberManagementInterface";
import { Dropdown } from "primereact/dropdown";

const roleOptions = [
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Member",
    value: "Member",
  },
];

export default function MemberManagementPage() {
  const loaderRes = useLoaderData<typeof getMemberListLoader>();
  const [inviteDialogVisible, setInviteDialogVisible] = useState(false);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const { inviteMember } = useInviteMember();

  const statusClasses: Record<string, string> = {
    Active: "status-active",
    Pending: "status-pending",
  };

  const handleCloseInviteDialog = () => {
    setInviteDialogVisible(false);
    setEmail("");
    setRole(null);
  };

  const handleInviteMember = async () => {
    if (!email.trim() || !role) {
      return;
    }

    const request: InviteMemberRequest = {
      email: email.trim(),
      role,
    };

    // Replace this with your actual API call.
    await inviteMember(request);

    handleCloseInviteDialog();
    setSuccessDialogVisible(true);
  };

  return (
    <div className="member-page">
      <div className="member-card">
        <div className="member-header">
          <div>
            <h1>Members</h1>
            <p>Manage members in your organization.</p>
          </div>

          <Button
            label="Invite Member"
            icon="pi pi-plus"
            onClick={() => setInviteDialogVisible(true)}
          />
        </div>

        <div className="member-table-wrapper">
          <table className="member-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {loaderRes.isSuccess &&
                loaderRes.data.memberInfos.map((member) => (
                  <tr>
                    <td>{member.fullName}</td>
                    <td>{member.email}</td>
                    <td>{member.role}</td>
                    <td>
                      <span className={`status ${statusClasses[member.memberStatus] ?? ""}`}>
                        {member.memberStatus}
                      </span>
                    </td>
                    <td>{member.joinAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        header="Invite Member"
        visible={inviteDialogVisible}
        onHide={handleCloseInviteDialog}
        modal
        draggable={false}
        className="invite-member-dialog"
      >
        <p className="invite-description">
          Enter the member's email address and select their role.
        </p>

        <div className="invite-form">
          <div className="invite-form-field">
            <label htmlFor="memberEmail">Email Address</label>

            <InputText
              id="memberEmail"
              type="email"
              value={email}
              placeholder="member@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="invite-form-field">
            <label htmlFor="memberRole">Role</label>

            <Dropdown
              id="memberRole"
              value={role}
              options={roleOptions}
              onChange={(event) => setRole(event.value)}
              placeholder="Select a role"
              className="w-full"
            />
          </div>
        </div>

        <div className="invite-dialog-actions">
          <Button label="Cancel" severity="secondary" outlined onClick={handleCloseInviteDialog} />

          <Button
            label="Send Invitation"
            icon="pi pi-send"
            disabled={!email.trim() || !role}
            onClick={handleInviteMember}
          />
        </div>
      </Dialog>

      <Dialog
        visible={successDialogVisible}
        onHide={() => setSuccessDialogVisible(false)}
        modal
        draggable={false}
        closable={false}
        className="invite-success-dialog"
      >
        <div className="invite-success-content">
          <div className="success-icon">
            <i className="pi pi-check" />
          </div>

          <h2>Invitation Sent</h2>

          <p>The member invitation has been sent successfully.</p>

          <Button label="Done" onClick={() => setSuccessDialogVisible(false)} />
        </div>
      </Dialog>
    </div>
  );
}
