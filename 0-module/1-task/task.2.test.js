describe('0-module-1-task', () => {
  it('undefined, undefined', () => {
    expect(sum).toThrowError(TypeError, 'Не число');
  });

  it('Infinity, Infinity', () => {
    expect(sum(Infinity, Infinity)).toEqual(Infinity);
  });

  it('" ", " "', () => {
    const check = () => {
      sum(" ", " ");
    };

    expect(check).toThrowError(TypeError, 'Не число');
  });

  it('{}, {}', () => {
    const check = () => {
      sum({}, {});
    };
    
    expect(check).toThrowError(TypeError, 'Не число');
  });

  it('[], []', () => {
    const check = () => {
      sum([], []);
    };
    
    expect(check).toThrowError(TypeError, 'Не число');
  });
});

describe('0-module-1-task-isNumber', () => {
  it('', () => {
    let arrayParameter = [
      1, 
      null, 
      undefined,
      NaN,
      '',
      Infinity,
      /\s/,
      [],
      {},
      () => {},
      1n
    ];

    for (let el in arrayParameter) {
      expect(isNumber(el)).toBeFalse();
    }
  });
});
