import { buildField } from './helpers/builders';
import { expectThatTyping } from './helpers/expectations';
import Keysim from 'keysim';
import FieldKit from '../../src';
import {expect} from 'chai';

testsWithAllKeyboards('FieldKit.CardTextField', function() {
  var textField;
  var visa = '4111 1111 1111 1111';

  beforeEach(function() {
    textField = buildField(FieldKit.CardTextField);
  });

  it('uses an adaptive card formatter by default', function() {
    expect(textField.formatter() instanceof FieldKit.AdaptiveCardFormatter).to.be.true;
  });

  describe('#cardType', function() {
    it('is VISA when the card number starts with 4', function() {
      textField.setValue('4');
      expect(textField.cardType()).to.equal('visa');
    });

    it('is DISCOVER when the card number matches', function() {
      textField.setValue('6011');
      expect(textField.cardType()).to.equal('discover');
    });

    it('is MASTERCARD when the card number matches', function() {
      textField.setValue('51');
      expect(textField.cardType()).to.equal('mastercard');
    });

    it('is AMEX when the card number matches', function() {
      textField.setValue('34');
      expect(textField.cardType()).to.equal('amex');
    });
  });

  describe('#cardMaskStrategy', function() {
    describe('when set to None (the default)', function() {
      beforeEach(function() {
        textField.setCardMaskStrategy(FieldKit.CardTextField.CardMaskStrategy.None);
      });

      it('does not change the displayed card number on end editing', function() {
        textField.textFieldDidBeginEditing();
        expectThatTyping(visa)
          .into(textField)
          .before(() => textField.textFieldDidEndEditing())
          .willChange('|')
          .to(`${visa}|`);
      });
    });

    describe('when set to DoneEditing', function() {
      beforeEach(function() {
        textField.setCardMaskStrategy(FieldKit.CardTextField.CardMaskStrategy.DoneEditing);
      });

      it('does not change the displayed card number while typing', function() {
        textField.textFieldDidBeginEditing();
        expectThatTyping(visa)
          .into(textField)
          .willChange('|')
          .to(`${visa}|`);
      });

      it('masks the displayed card number on end editing', function() {
        textField.textFieldDidBeginEditing();
        expectThatTyping(visa)
          .into(textField)
          .before(() => textField.textFieldDidEndEditing.call(textField))
          .willChange('|')
          .to('•••• •••• •••• 1111|');
      });

      it('does change the selected range on end editing', function() {
        textField.textFieldDidBeginEditing();
        expectThatTyping('enter').into(textField).willChange(`|${visa}>`).to('•••• •••• •••• 1111|');
      });

      it('restores the original value on beginning editing', function() {
        textField.textFieldDidBeginEditing();
        expectThatTyping(visa)
          .into(textField)
          .before(() => {
            textField.textFieldDidEndEditing();
            textField.textFieldDidBeginEditing();
          })
          .willChange('|')
          .to(`${visa}|`);
      });

      it('masks when a value is set before editing', function() {
        textField.setValue('1234567890123456');
        expect(textField.element.value).to.equal('•••• •••• •••• 3456');
      });

      // PENDING
      //
      // it('restores the original value when disabling masking', function() {
      //   type(visa).into(textField);
      //   textField.textFieldDidEndEditing();
      //   textField.setCardMaskStrategy(FieldKit.CardTextField.CardMaskStrategy.None);
      //   expect(textField.element.value).to.equal(visa);
      // });

      // PENDING
      //
      // it('masks the value when enabling masking', function() {
      //   type(visa).into(textField);
      //   textField.textFieldDidEndEditing();
      //   textField.setCardMaskStrategy(FieldKit.CardTextField.CardMaskStrategy.None);
      //   textField.setCardMaskStrategy(FieldKit.CardTextField.CardMaskStrategy.DoneEditing);
      //   expect(textField.element.value).to.equal('•••• •••• •••• 1111');
      // });
    });
  });
});
