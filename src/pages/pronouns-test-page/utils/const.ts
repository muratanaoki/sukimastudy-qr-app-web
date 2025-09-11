import { PronounItem, PronounGroup } from './type';

export const DATA_RAW: Omit<PronounItem, 'index'>[] = [
  // 01. Personal / Possessive / Reflexive
  {
    group: PronounGroup.Personal,
    term: 'I',
    ipa: '/aɪ/',
    jp: '私は',
  },
  {
    group: PronounGroup.Personal,
    term: 'my',
    ipa: '/maɪ/',
    jp: '私の',
  },
  {
    group: PronounGroup.Personal,
    term: 'me',
    ipa: '/miː/',
    jp: '私を、私に',
  },
  {
    group: PronounGroup.Personal,
    term: 'mine',
    ipa: '/maɪn/',
    jp: '私のもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'myself',
    ipa: '/maɪˈsɛlf/',
    jp: '私自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'we',
    ipa: '/wiː/',
    jp: '私たちは',
  },
  {
    group: PronounGroup.Personal,
    term: 'our',
    ipa: '/ˈaʊɚ/',
    jp: '私たちの',
  },
  {
    group: PronounGroup.Personal,
    term: 'us',
    ipa: '/ʌs/',
    jp: '私たちを、私たちに',
  },
  {
    group: PronounGroup.Personal,
    term: 'ours',
    ipa: '/ˈaʊɚz/',
    jp: '私たちのもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'ourselves',
    ipa: '/ɑrˈsɛlvz/',
    jp: '私たち自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたは',
  },
  {
    group: PronounGroup.Personal,
    term: 'your',
    ipa: '/jʊr/',
    jp: 'あなたの',
  },
  {
    group: PronounGroup.Personal,
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたを、あなたに',
  },
  {
    group: PronounGroup.Personal,
    term: 'yours',
    ipa: '/jʊrz/',
    jp: 'あなたのもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'yourself',
    ipa: '/jʊrˈsɛlf/',
    jp: 'あなた自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたたちは',
  },
  {
    group: PronounGroup.Personal,
    term: 'your',
    ipa: '/jʊr/',
    jp: 'あなたたちの',
  },
  {
    group: PronounGroup.Personal,
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたたちを、あなたたちに',
  },
  {
    group: PronounGroup.Personal,
    term: 'yours',
    ipa: '/jʊrz/',
    jp: 'あなたたちのもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'yourselves',
    ipa: '/jʊrˈsɛlvz/',
    jp: 'あなたたち自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'he',
    ipa: '/hiː/',
    jp: '彼は',
  },
  {
    group: PronounGroup.Personal,
    term: 'his',
    ipa: '/hɪz/',
    jp: '彼の',
  },
  {
    group: PronounGroup.Personal,
    term: 'him',
    ipa: '/hɪm/',
    jp: '彼を、彼に',
  },
  {
    group: PronounGroup.Personal,
    term: 'his',
    ipa: '/hɪz/',
    jp: '彼のもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'himself',
    ipa: '/hɪmˈsɛlf/',
    jp: '彼自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'she',
    ipa: '/ʃiː/',
    jp: '彼女は',
  },
  {
    group: PronounGroup.Personal,
    term: 'her',
    ipa: '/hɝː/',
    jp: '彼女の',
  },
  {
    group: PronounGroup.Personal,
    term: 'her',
    ipa: '/hɝː/',
    jp: '彼女を、彼女に',
  },
  {
    group: PronounGroup.Personal,
    term: 'hers',
    ipa: '/hɝːz/',
    jp: '彼女のもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'herself',
    ipa: '/hɝːˈsɛlf/',
    jp: '彼女自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'it',
    ipa: '/ɪt/',
    jp: 'それは',
  },
  {
    group: PronounGroup.Personal,
    term: 'its',
    ipa: '/ɪts/',
    jp: 'それの',
  },
  {
    group: PronounGroup.Personal,
    term: 'it',
    ipa: '/ɪt/',
    jp: 'それを、それに',
  },
  {
    group: PronounGroup.Personal,
    term: 'itself',
    ipa: '/ɪtˈsɛlf/',
    jp: 'それ自身',
  },

  {
    group: PronounGroup.Personal,
    term: 'they',
    ipa: '/ðeɪ/',
    jp: '彼らは',
  },
  {
    group: PronounGroup.Personal,
    term: 'their',
    ipa: '/ðɛr/',
    jp: '彼らの',
  },
  {
    group: PronounGroup.Personal,
    term: 'them',
    ipa: '/ðɛm/',
    jp: '彼らを、彼らに',
  },
  {
    group: PronounGroup.Personal,
    term: 'theirs',
    ipa: '/ðɛrz/',
    jp: '彼らのもの',
  },
  {
    group: PronounGroup.Personal,
    term: 'themselves',
    ipa: '/ðɛmˈsɛlvz/',
    jp: '彼ら自身',
  },

  // 02. Indefinite (person/thing)
  {
    group: PronounGroup.IndefPersonThing,
    term: 'someone',
    ipa: '/ˈsʌmˌwʌn/',
    jp: '誰か',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'somebody',
    ipa: '/ˈsʌmˌbɑːdi/',
    jp: '誰か',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'something',
    ipa: '/ˈsʌmˌθɪŋ/',
    jp: '何か',
  },

  {
    group: PronounGroup.IndefPersonThing,
    term: 'anyone',
    ipa: '/ˈɛniˌwʌn/',
    jp: '誰でも、誰か',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'anybody',
    ipa: '/ˈɛniˌbɑːdi/',
    jp: '誰でも、誰か',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'anything',
    ipa: '/ˈɛniˌθɪŋ/',
    jp: '何でも、何か',
  },

  {
    group: PronounGroup.IndefPersonThing,
    term: 'everyone',
    ipa: '/ˈɛvriˌwʌn/',
    jp: 'みんな',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'everybody',
    ipa: '/ˈɛvriˌbɑːdi/',
    jp: 'みんな',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'everything',
    ipa: '/ˈɛvriˌθɪŋ/',
    jp: 'すべて',
  },

  {
    group: PronounGroup.IndefPersonThing,
    term: 'no one',
    ipa: '/ˈnoʊ ˌwʌn/',
    jp: '誰も〜ない',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'nobody',
    ipa: '/ˈnoʊˌbɑːdi/',
    jp: '誰も〜ない',
  },
  {
    group: PronounGroup.IndefPersonThing,
    term: 'nothing',
    ipa: '/ˈnʌθɪŋ/',
    jp: '何も〜ない',
  },

  // 03. Indefinite (quantity/partitive)
  { group: PronounGroup.IndefQuantityPartitive, term: 'one', ipa: '/wʌn/', jp: '一人、もの' },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'another',
    ipa: '/əˈnʌðɚ/',
    jp: 'もう一つの、別の',
  },
  { group: PronounGroup.IndefQuantityPartitive, term: 'other', ipa: '/ˈʌðɚ/', jp: '他の' },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'others',
    ipa: '/ˈʌðɚz/',
    jp: '他のもの、人々',
  },
  { group: PronounGroup.IndefQuantityPartitive, term: 'each', ipa: '/itʃ/', jp: 'それぞれ' },
  { group: PronounGroup.IndefQuantityPartitive, term: 'either', ipa: '/ˈiðɚ/', jp: 'どちらか' },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'neither',
    ipa: '/ˈniðɚ/',
    jp: 'どちらも〜ない',
  },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'none',
    ipa: '/nʌn/',
    jp: 'どれも〜ない、誰も〜ない',
  },
  { group: PronounGroup.IndefQuantityPartitive, term: 'some', ipa: '/sʌm/', jp: 'いくつかの' },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'any',
    ipa: '/ˈɛni/',
    jp: 'いくらか、どれか',
  },
  { group: PronounGroup.IndefQuantityPartitive, term: 'certain', ipa: '/ˈsɝːtn/', jp: 'ある人々' },
  { group: PronounGroup.IndefQuantityPartitive, term: 'all', ipa: '/ɔl/', jp: 'すべて' },
  { group: PronounGroup.IndefQuantityPartitive, term: 'both', ipa: '/boʊθ/', jp: '両方' },
  { group: PronounGroup.IndefQuantityPartitive, term: 'most', ipa: '/moʊst/', jp: 'ほとんどの' },
  { group: PronounGroup.IndefQuantityPartitive, term: 'more', ipa: '/mɔr/', jp: 'もっと多くの' },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'many',
    ipa: '/ˈmɛni/',
    jp: '多くの（可算）',
  },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'much',
    ipa: '/mʌtʃ/',
    jp: '多くの（不可算）',
  },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'several',
    ipa: '/ˈsɛvrəl/',
    jp: 'いくつかの',
  },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'few',
    ipa: '/fjuː/',
    jp: 'ほとんど〜ない（可算）',
  },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'little',
    ipa: '/ˈlɪtl/',
    jp: 'ほとんど〜ない（不可算）',
  },
  { group: PronounGroup.IndefQuantityPartitive, term: 'less', ipa: '/lɛs/', jp: 'より少ない' },
  {
    group: PronounGroup.IndefQuantityPartitive,
    term: 'least',
    ipa: '/list/',
    jp: '最小、最も少ない',
  },
  { group: PronounGroup.IndefQuantityPartitive, term: 'enough', ipa: '/ɪˈnʌf/', jp: '十分な' },

  // 04. Demonstrative & Other
  { group: PronounGroup.Demonstrative, term: 'this', ipa: '/ðɪs/', jp: 'これ' },
  { group: PronounGroup.Demonstrative, term: 'these', ipa: '/ðiːz/', jp: 'これら' },
  { group: PronounGroup.Demonstrative, term: 'that', ipa: '/ðæt/', jp: 'それ、あれ' },
  { group: PronounGroup.Demonstrative, term: 'those', ipa: '/ðoʊz/', jp: 'それら、あれら' },
  { group: PronounGroup.Demonstrative, term: 'such', ipa: '/sʌtʃ/', jp: 'そのようなもの、こと' },
  { group: PronounGroup.Demonstrative, term: 'same', ipa: '/seɪm/', jp: '同じもの、こと' },
];
