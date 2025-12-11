import React from 'react';
import { Link } from 'react-router-dom';

const StrainsPage: React.FC = () => {
    return (
        <div>
            <h1>Strains Bred by Skinnyjeans</h1>
            <p>
                Jay Hershfield's journey in growing cannabis began with a passion for the plant and a desire to explore its genetic diversity. Over the years, he has dedicated himself to breeding unique strains that capture the essence of cannabis culture. His commitment to quality and innovation has led him to experiment with various genetics, resulting in a collection of strains that are both potent and flavorful.
            </p>
            <p>
                As a pioneer in the cannabis breeding community, Jay has focused on creating strains that not only perform well in cultivation but also offer a rich experience for consumers. His work has been recognized by enthusiasts and connoisseurs alike, and he continues to push the boundaries of what is possible in cannabis breeding. Each strain tells a story of its lineage and the careful selection process that Jay employs to ensure the best traits are passed down.
            </p>
            <p>
                The legacy of Strainger Seeds lives on through the strains bred by Jay Hershfield. With a focus on sustainability and ethical breeding practices, he aims to contribute positively to the cannabis community. By sharing his knowledge and passion, Jay hopes to inspire the next generation of growers and breeders to explore the vast potential of cannabis genetics.
            </p>
            <h2>Available Strains:</h2>
            <ul>
                <li><Link to="/strain/strain1">Strain 1</Link></li>
                <li><Link to="/strain/strain2">Strain 2</Link></li>
                <li><Link to="/strain/strain3">Strain 3</Link></li>
                {/* Add more strains as needed */}
            </ul>
        </div>
    );
};

export default StrainsPage;