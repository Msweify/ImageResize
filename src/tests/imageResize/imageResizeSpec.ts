import resizeImage from '../../imageResize/index';

describe('Tests for the resizing functionality', () => {
  it('Should resize image correctly to the input width and height', async () => {
    const imgResize = await resizeImage.resizeImage(
      './images/encenadaport.jpg',
      500,
      500
    );
    expect(imgResize).toBeTrue;
  });
  it('Should error out if width is string with specific error', async () => {
    const w: unknown = '500';
    interface errorIntf {
      message: string;
    }
    try {
      await resizeImage.resizeImage(
        './images/encenadaport.jpg',
        w as number,
        500
      );
    } catch (e: unknown) {
      const err = e as unknown as errorIntf;
      const str = err.message;
      expect(str).toContain(
        'Expected positive integer for width but received 500 of type string'
      );
    }
  });
});
