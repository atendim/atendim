import {
  NestedKeyOf,
  NamespaceKeys,
  MessageKeys,
  NestedValueOf
} from 'next-intl';

export type NestedMessages = NestedKeyOf<Messages>;

export type NestedKey = NamespaceKeys<Messages, NestedKeyOf<Messages>>;

export type MessageKeyTarget<Key extends NestedKey> = MessageKeys<
  NestedValueOf<
    {
      '!': IntlMessages;
    },
    [Key] extends [never] ? '!' : `!.${Key}`
  >,
  NestedKeyOf<
    NestedValueOf<
      {
        '!': IntlMessages;
      },
      [Key] extends [never] ? '!' : `!.${Key}`
    >
  >
>;
