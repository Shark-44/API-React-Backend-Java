// TabContext.tsx
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

type TabProviderProps = {
  children: ReactNode;
};

function TabProvider({ children }: TabProviderProps) {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab || 'deconnexion';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
}

function useTab() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
}

export { TabProvider, useTab };