import React from 'react';

const StrainDetailPage: React.FC<{ strainId: string }> = ({ strainId }) => {
    // Dummy data for strain details
    const strainDetails = {
        'strain1': {
            name: 'Chem 91 x Problem Child',
            description: 'This strain is Chem 91 S1 crossed into Problem Child F2. It offers a unique blend of flavors and effects, making it a favorite among cannabis enthusiasts.',
            breedingHistory: 'Jay Hershfield has dedicated years to perfecting this strain, focusing on stability and potency. His journey began with a passion for cannabis cultivation, leading him to explore various breeding techniques.',
            characteristics: 'The Chem 91 x Problem Child strain is known for its robust growth and high yield. It features a complex aroma profile with hints of earthiness and sweetness, appealing to both novice and experienced growers.'
        }
    };

    const strain = strainDetails[strainId] || { name: 'Unknown Strain', description: 'No details available.' };

    return (
        <div>
            <h1>{strain.name}</h1>
            <p>{strain.description}</p>
            <h2>Breeding History</h2>
            <p>{strain.breedingHistory}</p>
            <h2>Characteristics</h2>
            <p>{strain.characteristics}</p>
        </div>
    );
};

export default StrainDetailPage;