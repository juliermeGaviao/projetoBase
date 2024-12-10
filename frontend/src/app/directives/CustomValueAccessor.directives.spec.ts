import { ElementRef, Renderer2 } from '@angular/core';
import { CustomValueAccessorDirective } from './CustomValueAccessor.directives';

describe('CustomValueAccessorDirective', () => {
  let directive: CustomValueAccessorDirective;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: {
        value: '',
      },
    } as any;

    mockRenderer = {
      setProperty: jest.fn(),
    } as any;

    directive = new CustomValueAccessorDirective(mockElementRef, mockRenderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('value accessor', () => {
    it('should set and get value correctly', () => {
      const spyOnChange = jest.fn();
      const spyOnTouched = jest.fn();
      directive.registerOnChange(spyOnChange);
      directive.registerOnTouched(spyOnTouched);

      directive.value = 'test value';

      expect(directive.value).toBe('test value');
      expect(spyOnChange).toHaveBeenCalledWith('test value');
      expect(spyOnTouched).toHaveBeenCalled();
      expect(mockRenderer.setProperty).toHaveBeenCalledWith(
        mockElementRef.nativeElement,
        'value',
        'test value'
      );
    });

    it('should not call onChange or onTouched if value is the same', () => {
      const spyOnChange = jest.fn();
      const spyOnTouched = jest.fn();
      directive.registerOnChange(spyOnChange);
      directive.registerOnTouched(spyOnTouched);

      directive.value = 'same value';
      directive.value = 'same value'; 

      expect(spyOnChange).toHaveBeenCalledTimes(1);
      expect(spyOnTouched).toHaveBeenCalledTimes(1);
    });
  });

  describe('writeValue', () => {
    it('should write a value and update element', () => {
      directive.writeValue('new value');

      expect(directive.value).toBe('new value');
      expect(mockRenderer.setProperty).toHaveBeenCalledWith(
        mockElementRef.nativeElement,
        'value',
        'new value'
      );
    });
  });

  describe('setDisabledState', () => {
    it('should set disabled state correctly', () => {
      directive.setDisabledState(true);
      expect(directive.disabled).toBe(true);

      directive.setDisabledState(false);
      expect(directive.disabled).toBe(false);
    });
  });

  describe('registerOnChange', () => {
    it('should register a callback for onChange', () => {
      const onChangeCallback = jest.fn();
      directive.registerOnChange(onChangeCallback);

      directive.value = 'value change';
      expect(onChangeCallback).toHaveBeenCalledWith('value change');
    });
  });

  describe('registerOnTouched', () => {
    it('should register a callback for onTouched', () => {
      const onTouchedCallback = jest.fn();
      directive.registerOnTouched(onTouchedCallback);

      directive.value = 'value change';
      expect(onTouchedCallback).toHaveBeenCalled();
    });
  });
});
