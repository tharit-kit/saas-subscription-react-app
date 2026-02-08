import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
 
export default function HomePage(){
    const headerStarterTier = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footerStarterTier = (
        <>
            <Button label="Subscribe Now" icon="pi pi-check" />
            {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );

    const headerProTier = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footerProTier = (
        <>
            <Button label="Subscribe Now" icon="pi pi-check" />
            {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );

    const headerEnterpriseTier = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footerEnterpriseTier = (
        <>
            <Button label="Subscribe Now" icon="pi pi-check" />
            {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );

    return(
        <Card>
            <div className="flex flex-wrap gap-4 justify-center">
                <Card title="Starter" subTitle="Benefits:" footer={footerStarterTier} header={headerStarterTier} className="w-80">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>

                <Card title="Pro" subTitle="Benefits:" footer={footerProTier} header={headerProTier} className="w-80">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>

                <Card title="Enterprise" subTitle="Benefits:" footer={footerEnterpriseTier} header={headerEnterpriseTier} className="w-80">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>
            </div>
            <Divider />
            <div className="flex flex-wrap gap-4 justify-center">
                <p className="text-5xl">Who use our product</p>
            </div>
        </Card>
    );
}