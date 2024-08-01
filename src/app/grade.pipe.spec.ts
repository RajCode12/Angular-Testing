import { GradePipe } from './grade.pipe';

describe('GradePipe', () => {
  let pipe : GradePipe;

  beforeEach(() => {
    pipe = new GradePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should assign A grade for marks above 90', () => {
    let grade = pipe.transform(93);
    expect(grade).toBe("A");
  });

  it('should assign FAIL grade for marks below 35', () => {
    let grade = pipe.transform(20);
    expect(grade).toBe("FAIL");
  });

  
});
