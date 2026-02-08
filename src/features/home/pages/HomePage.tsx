import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
 
export default function HomePage(){
    const headerStarterTier = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footerStarterTier = (
        <div className="flex justify-center">
            <Button label="Subscribe Now" icon="pi pi-check" />
        </div>
    );

    const headerProTier = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footerProTier = (
        <div className="flex justify-center">
            <Button label="Subscribe Now" icon="pi pi-check" />
        </div>
    );

    const headerEnterpriseTier = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footerEnterpriseTier = (
        <div className="flex justify-center">
            <Button label="Subscribe Now" icon="pi pi-check" />
        </div>
    );

    return(
        <Card>
            <div className="flex flex-col space-y-12">
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
                <div className="flex flex-col items-center space-y-12">
                    <p className="text-5xl">Who use our product</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Image src="/src/assets/images/logos/amazon_logo.png" width="100" />
                        <Image src="/src/assets/images/logos/google_logo.png" width="200" />
                        <Image src="/src/assets/images/logos/instagram_logo.png" width="100" />
                        <Image src="/src/assets/images/logos/meta_logo.png" width="200" />
                        <Image src="/src/assets/images/logos/ms_logo.png" width="300" />
                    </div>
                </div>
                <Divider></Divider>
                
            </div>
        </Card>
    );
}