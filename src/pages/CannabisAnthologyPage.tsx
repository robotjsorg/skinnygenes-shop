import React from 'react';
import './CannabisAnthologyPage.css';

const anthologyData = [
    { year: 1960, event: 'Landrace strains like Acapulco Gold and Panama Red become popular.' },
    { year: 1970, event: 'Skunk #1 is developed, one of the first influential hybrids.' },
    { year: 1980, event: 'Northern Lights is created, setting a new standard for indica strains.' },
    { year: 1990, event: 'Haze strains gain popularity for their sativa effects.' },
    { year: 2000, event: 'OG Kush appears in Los Angeles, becoming a West Coast staple.' },
    { year: 2010, event: 'The rise of high-CBD strains for medicinal use, like Charlotte\'s Web.' },
    { year: 2020, event: 'Exotic new hybrids and a focus on terpene profiles dominate the market.' },
];

const CannabisAnthologyPage: React.FC = () => {
    return (
        <div className="anthology-page">
            <h2>Cannabis Anthology</h2>
            <p>A journey through the history of cannabis strains.</p>
            <div className="timeline-container">
                <div className="timeline">
                    {anthologyData.map((item, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-year">{item.year}</div>
                            <div className="timeline-event">{item.event}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CannabisAnthologyPage;
