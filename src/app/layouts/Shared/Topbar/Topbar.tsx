import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";

type TopbarProps = {
  items: MenuItem[];
  end?: React.ReactNode;
};

export default function Topbar({ items, end }: TopbarProps) {
  return <Menubar model={items} end={end} />;
}