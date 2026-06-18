import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../src/context/LanguageContext';

// A simple component to test the context
const TestComponent = () => {
    const { t } = useLanguage();
    return <div>{t('softwareDeveloper')}</div>;
};

describe('LanguageContext', () => {
    it('provides default english translation before mounting', () => {
        render(
            <LanguageProvider>
                <TestComponent />
            </LanguageProvider>
        );
        
        // Before client side effect runs, it defaults to 'en'
        expect(screen.getByText('Software Developer')).toBeInTheDocument();
    });
});
