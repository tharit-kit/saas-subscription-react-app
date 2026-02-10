import { Button } from "primereact/button";
import { Card } from "primereact/card";

type TierCardProps = {
  title: string;
  subTitle: string;
  body: string;
};

function TierCardHeader(){
    return (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
}

function TierCardFooter(){
    return (
        <div className="flex justify-center">
            <Button label="Subscribe Now" icon="pi pi-check" />
        </div>
    );
}

export function TierCard({ title, subTitle, body }: TierCardProps) {
  return (
    <Card
      title={title}
      subTitle={subTitle}
      footer={TierCardFooter}
      header={TierCardHeader}
      className="w-80"
    >
      <p className="m-0">{body}</p>
    </Card>
  );
}
