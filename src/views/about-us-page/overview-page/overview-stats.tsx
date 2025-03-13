import Screen from '@/components/screen';

import { OverviewCard } from './overview-components';

const OverviewStats = () => {
  return (
    <div className="mt-12 py-16 bg-slate-200/30">
      <Screen>
        <h1 className="text-center text-3xl font-semibold">Dobamboo By the numbers</h1>
        <div className="grid grid-cols-3 gap-8 mt-12">
          <OverviewCard
            icon={
              <div className="w-36">
                <img src="/svgs/office.svg" alt="Office" />
              </div>
            }
            title="14 Global Offices"
          />
          <OverviewCard
            icon={
              <div className="w-36">
                <img src="/svgs/employee.svg" alt="Employee" />
              </div>
            }
            title="8000+ Employees"
          />
          <OverviewCard
            icon={
              <div className="w-36">
                <img src="/svgs/customers.svg" alt="Customers" />
              </div>
            }
            title="228,000+ Customers"
          />
        </div>
        <div className="mt-16">
          <h1 className="text-2xl font-semibold text-center">Voted #1 in 571 Reports</h1>
          <div className="mt-12 flex-1 flex flex-col gap-8 justify-center items-center">
            <div className="flex gap-16">
              <img src="/images/award.png" alt="Award" className="w-20" />
              <img src="/images/award.png" alt="Award" className="w-20" />
              <img src="/images/award.png" alt="Award" className="w-20" />
              <img src="/images/award.png" alt="Award" className="w-20" />
              <img src="/images/award.png" alt="Award" className="w-20" />
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
};

export default OverviewStats;
