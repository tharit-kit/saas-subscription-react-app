import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { TierCard } from "../components/TierCard";
import './home-page.css';

export default function HomePage(){
    return(
        <div className="home-page">
  
            {/* Tier Cards */}
            <div className="tier-section">
                <TierCard
                title="Starter"
                subTitle="Benefits:"
                body="Lorem ipsum dolor sit amet..."
                />
                <TierCard
                title="Pro"
                subTitle="Benefits:"
                body="Lorem ipsum dolor sit amet..."
                />
                <TierCard
                title="Enterprise"
                subTitle="Benefits:"
                body="Lorem ipsum dolor sit amet..."
                />
            </div>

            <Divider />

            {/* Logos */}
            <div className="logo-section">
                <p className="logo-title">Who use our product</p>

                <div className="logo-list">
                <Image src="/src/assets/images/logos/amazon_logo.png" width="100" />
                <Image src="/src/assets/images/logos/google_logo.png" width="200" />
                <Image src="/src/assets/images/logos/instagram_logo.png" width="100" />
                <Image src="/src/assets/images/logos/meta_logo.png" width="200" />
                <Image src="/src/assets/images/logos/ms_logo.png" width="300" />
                </div>
            </div>

            <Divider />
        </div>
    );
}