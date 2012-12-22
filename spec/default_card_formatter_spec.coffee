DefaultCardFormatter = require '../lib/default_card_formatter'
{buildField} = require './helpers/builders'
{expectThatTyping} = require './helpers/expectations'

describe 'DefaultCardFormatter', ->
  field = null

  beforeEach ->
    field = buildField()
    field.formatter = new DefaultCardFormatter()

  it 'adds a space after the first four digits', ->
    expectThatTyping('1').into(field).willChange('411|').to('4111 |')

  it 'groups digits into four groups of four separated by spaces', ->
    expectThatTyping('4111111111111111'.split('')...).into(field).willChange('|').to('4111 1111 1111 1111|')

  it 'backspaces both the space and the character before it', ->
    expectThatTyping('backspace').into(field).willChange('4111 |').to('411|')

  it 'allows backspacing a whole group of digits', ->
    expectThatTyping('alt+backspace').into(field).willChange('4111 1111 |').to('4111 |')
    field.formatter = null
    expectThatTyping('alt+backspace').into(field).willChange('4111 1|1').to('4111 |1')

  it 'prevents adding more than 16 digits', ->
    expectThatTyping('8').into(field).willNotChange('4111 1111 1111 1111|')

  it 'allows moving left over a space', ->
    expectThatTyping('left').into(field).willChange('4111 |').to('411|1 ')

  it 'selects not including spaces if possible', ->
    expectThatTyping('shift+left').into(field).willChange('4111 1<1|').to('4111 <11|')
    expectThatTyping('shift+right').into(field).willChange('41|1>1 11').to('41|11> 11')
    expectThatTyping('shift+right').into(field).willChange('41|11> 11').to('41|11 1>1')

  it 'selects past spaces as if they are not there', ->
    expectThatTyping('shift+left').into(field).willChange('4111 |1').to('411<1| 1')
    expectThatTyping('shift+left').into(field).willChange('4111 <1|1').to('411<1 1|1')