import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { TierCard } from "../components/TierCard";

export default function HomePage(){
    return(
        <Card>
            <div className="flex flex-col space-y-12">
                <div className="flex flex-wrap gap-4 justify-center">
                    <TierCard title="Starter" subTitle="Benefits:" body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!"></TierCard>
                    <TierCard title="Pro" subTitle="Benefits:" body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!"></TierCard>
                    <TierCard title="Enterprise" subTitle="Benefits:" body="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                            numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!"></TierCard>
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