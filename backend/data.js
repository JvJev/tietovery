import bcrypt from 'bcryptjs';

const data = {
  calculations: [
    {
    startDate: '05/16/2023',
    endDate: '05/22/2023',
    busyHours: 8,
    freeHours: 8,
    remainingDayFinalizer: 8,
    avgHoursPerDay: 8,
    },
    {
      startDate: '05/16/2023',
    endDate: '05/22/2023',
    busyHours: 8,
    freeHours: 8,
    remainingDayFinalizer: 8,
    avgHoursPerDay: 8,
    },
    
  ],
  users: [
    {
      name: 'Jev',
      email: 'jevgenij.voronov@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Tadas',
      email: 'info@tietoevry.com',
      password: bcrypt.hashSync('Tieto123'),
      isAdmin: false,
    },
  ],
};

export default data;
