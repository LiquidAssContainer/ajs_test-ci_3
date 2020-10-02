import getLevel from '../app'; // Если есть какие-то замечания или недочёты в этой задаче (и в первых двух) — хотелось бы знать. Не сразу вник в мокку.
import fetchData from '../fetchData';

jest.mock('../fetchData');

beforeEach(() => {
  jest.resetAllMocks();
});

test('Testing getLevel with OK response', () => {
  fetchData.mockReturnValue({ status: 'ok', level: 'Пуп Земли' });

  const result = getLevel(666);

  expect(fetchData).toHaveBeenCalledTimes(1);
  expect(fetchData).toHaveBeenCalledWith('https://server/user/666');
  expect(result).toBe('Ваш текущий уровень: Пуп Земли');
});

test('Testing getLevel with not OK response', () => {
  fetchData.mockReturnValue('{}');

  const result = getLevel(445);

  expect(fetchData).toHaveBeenCalledTimes(1);
  expect(fetchData).toHaveBeenCalledWith('https://server/user/445');
  expect(result).toBe('Информация об уровне временно недоступна');
});
