import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function MemberManagementPage() {
  const [inviteDialogVisible, setInviteDialogVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleInviteMember = () => {
    const request = {
      email,
    };

    console.log(request);

    // await inviteMember(request);

    setInviteDialogVisible(false);
    setEmail("");
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
              <tr>
                <td>John Smith</td>
                <td>john.smith@example.com</td>
                <td>Admin</td>
                <td>
                  <span className="status status-active">Active</span>
                </td>
                <td>Aug 5, 2026</td>
              </tr>

              <tr>
                <td>Alice Miller</td>
                <td>alice.miller@example.com</td>
                <td>Member</td>
                <td>
                  <span className="status status-active">Active</span>
                </td>
                <td>Aug 2, 2026</td>
              </tr>

              <tr>
                <td>Pending Invitation</td>
                <td>newmember@example.com</td>
                <td>Member</td>
                <td>
                  <span className="status status-pending">Pending</span>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        header="Invite Member"
        visible={inviteDialogVisible}
        onHide={() => setInviteDialogVisible(false)}
        modal
        draggable={false}
        className="invite-member-dialog"
      >
        <p className="invite-description">
          Enter the email address of the person you want to invite.
        </p>

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

        <div className="invite-dialog-actions">
          <Button
            label="Cancel"
            severity="secondary"
            outlined
            onClick={() => {
              setInviteDialogVisible(false);
              setEmail("");
            }}
          />

          <Button
            label="Send Invitation"
            icon="pi pi-send"
            disabled={!email.trim()}
            onClick={handleInviteMember}
          />
        </div>
      </Dialog>
    </div>
  );
}
