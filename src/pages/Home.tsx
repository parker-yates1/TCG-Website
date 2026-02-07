import React from 'react';
import FilterBar from '../components/FilterBar';
import CardGrid from '../components/CardGrid';

const Home: React.FC = () => {
    return (
        <>
            <FilterBar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <CardGrid />
            </div>
        </>
    );
};

export default Home;
