export class Content {
  private readonly content: string;

  private validation(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentValid = this.validation(content);
    if (!isContentValid) {
      throw new Error('Content length error.');
    }
    this.content = content;
  }

  get value(): string {
    return this.content;
  }
}
