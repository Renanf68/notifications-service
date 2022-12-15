import { Content } from './notification-content';

describe('Notification content', () => {
  it('Should be able to create content', () => {
    const content = new Content('Teste de conteúdo!');
    expect(content).toBeTruthy();
  });
  it('Should not be able to create content with length < 5', () => {
    expect(() => new Content('aaa')).toThrow();
  });
  it('Should not be able to create content with length > 240', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
