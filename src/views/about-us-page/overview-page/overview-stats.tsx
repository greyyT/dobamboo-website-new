import Screen from '@/components/screen';

import { OverviewCard } from './overview-components';

const OverviewStats = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-slate-50">
      <Screen>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">Trevita By the numbers</h1>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <OverviewCard
            icon={<img src="/svgs/office.svg" alt="Office" className="w-full h-auto" />}
            title="14 Global Offices"
          />
          <OverviewCard
            icon={<img src="/svgs/employee.svg" alt="Employee" className="w-full h-auto" />}
            title="8000+ Employees"
          />
          <OverviewCard
            icon={<img src="/svgs/customers.svg" alt="Customers" className="w-full h-auto" />}
            title="228,000+ Customers"
          />
        </div>
      </Screen>
    </div>
  );
};

export default OverviewStats;
