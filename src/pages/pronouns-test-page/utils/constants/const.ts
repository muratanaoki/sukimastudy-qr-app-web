import { RawPronounItem } from '../domain/type';

/**
 * Pronouns テストで利用する静的定数集。
 * - 問題データは段階的に分割された生配列を保持し、後段で UI 用に整形。
 * - ボタンラベルやフラッシュ秒数など、複数コンポーネントから参照される定数も一元化。
 * - 本ファイルを更新するときは `RawPronounItem` の構造を維持することで整合性を保つ。
 */

export const DATA_RAW_SOURCE1: RawPronounItem[] = [
  {
    term: 'I\u2060', // ZERO WIDTH WORD JOINER (音は出ない)
    ipa: '/aɪ/',
    jp: '私は',
    examples: [
      { en: 'I am fifteen.', jp: '私は15歳です。', level: 1 },
      { en: "I don't have any homework today.", jp: '今日は宿題がありません。', level: 2 },
      { en: 'I have never been abroad.', jp: '私は海外に行ったことがありません。', level: 3 },
    ],
    choices: {
      enToJp: ['あなたは', '彼は', '私たちは'],
      jpToEn: ['me', 'my', 'mine'],
    },
  },
  {
    term: 'my',
    ipa: '/maɪ/',
    jp: '私の',
    examples: [
      { en: 'This is my bag.', jp: 'これは私のカバンです。', level: 1 },
      { en: 'My sister plays the piano.', jp: '私の妹はピアノを弾きます。', level: 2 },
      { en: 'My dream is to study overseas.', jp: '私の夢は海外で勉強することです。', level: 3 },
    ],
    choices: {
      enToJp: ['私のもの', '私を、私に', 'あなたの'],
      jpToEn: ['mine', 'me', 'our'],
    },
  },
  {
    term: 'me',
    ipa: '/miː/',
    jp: '私を、私に',
    examples: [
      { en: 'Please help me.', jp: '私を手伝ってください。', level: 1 },
      { en: 'Could you call me later?', jp: '後で私に電話してくれますか。', level: 2 },
      {
        en: 'Everyone trusted me during the project.',
        jp: 'そのプロジェクトの間、皆が私を信頼してくれました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私の', '私のもの', '私自身'],
      jpToEn: ['I', 'mine', 'myself'],
    },
  },
  {
    term: 'mine',
    ipa: '/maɪn/',
    jp: '私のもの',
    examples: [
      { en: 'That pen is mine.', jp: 'そのペンは私のものです。', level: 1 },
      { en: 'The bigger one is mine.', jp: '大きい方は私のものです。', level: 2 },
      {
        en: 'This seat was reserved, and it is mine.',
        jp: 'この席は予約してあって、私のものです。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私の', '私を、私に', 'あなたのもの'],
      jpToEn: ['my', 'me', 'yours'],
    },
  },
  {
    term: 'myself',
    ipa: '/maɪˈsɛlf/',
    jp: '私自身',
    examples: [
      { en: 'I made lunch by myself.', jp: '私は一人で昼ごはんを作りました。', level: 1 },
      {
        en: 'I taught myself basic coding.',
        jp: '私は独学で基礎的なコーディングを学びました。',
        level: 2,
      },
      {
        en: 'I challenged myself to speak only English today.',
        jp: '今日は英語だけで話すことに自分で挑戦しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私のもの', '私たち自身', '彼自身'],
      jpToEn: ['mine', 'ourselves', 'himself'],
    },
  },

  {
    term: 'we',
    ipa: '/wiː/',
    jp: '私たちは',
    examples: [
      { en: 'We are in the same class.', jp: '私たちは同じクラスです。', level: 1 },
      {
        en: 'We are studying for the test now.',
        jp: '私たちは今テストの勉強をしています。',
        level: 2,
      },
      {
        en: 'We have known each other since last year.',
        jp: '私たちは去年からお互いを知っています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['彼らは', 'あなたたちは', '私は'],
      jpToEn: ['they', 'you', 'I'],
    },
  },
  {
    term: 'our',
    ipa: '/ˈaʊɚ/',
    jp: '私たちの',
    examples: [
      { en: 'This is our classroom.', jp: 'これは私たちの教室です。', level: 1 },
      {
        en: 'Our team will practice after school.',
        jp: '私たちのチームは放課後に練習します。',
        level: 2,
      },
      {
        en: 'Our teacher has given us extra homework.',
        jp: '私たちの先生は追加の宿題を出しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私たちのもの', '私たちを、私たちに', 'あなたたちの'],
      jpToEn: ['ours', 'us', 'your'],
    },
  },
  {
    term: 'us',
    ipa: '/ʌs/',
    jp: '私たちを、私たちに',
    examples: [
      { en: 'Please wait for us.', jp: '私たちを待ってください。', level: 1 },
      {
        en: 'The coach told us to run faster.',
        jp: 'コーチは私たちにもっと速く走るよう言いました。',
        level: 2,
      },
      {
        en: 'They invited us to join the project.',
        jp: '彼らは私たちをプロジェクトに招待しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私たちの', '私たちのもの', '私たち自身'],
      jpToEn: ['our', 'ours', 'ourselves'],
    },
  },
  {
    term: 'ours',
    ipa: '/ˈaʊɚz/',
    jp: '私たちのもの',
    examples: [
      { en: 'That desk is ours.', jp: 'あの机は私たちのものです。', level: 1 },
      { en: 'The blue bags are ours.', jp: '青いカバンは私たちのものです。', level: 2 },
      {
        en: 'This win is ours, not theirs.',
        jp: 'この勝利は彼らではなく私たちのものです。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私たちの', '彼らのもの', 'あなたたちのもの'],
      jpToEn: ['our', 'theirs', 'yours'],
    },
  },
  {
    term: 'ourselves',
    ipa: '/ɑrˈsɛlvz/',
    jp: '私たち自身',
    examples: [
      {
        en: 'We made sandwiches by ourselves.',
        jp: '私たちは自分たちでサンドイッチを作りました。',
        level: 1,
      },
      {
        en: 'We introduced ourselves to the new students.',
        jp: '私たちは新入生に自分たちを紹介しました。',
        level: 2,
      },
      {
        en: 'We challenged ourselves to speak English all day.',
        jp: '私たちは一日中英語だけで話すことに挑戦しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['私たちを、私たちに', 'あなたたち自身', '彼ら自身'],
      jpToEn: ['us', 'yourselves', 'themselves'],
    },
  },

  {
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたは',
    examples: [
      { en: 'You are my friend.', jp: 'あなたは私の友だちです。', level: 1 },
      {
        en: 'You should bring a jacket today.',
        jp: '今日は上着を持ってきたほうがいいです。',
        level: 2,
      },
      {
        en: 'You have grown more confident this year.',
        jp: 'あなたは今年、前より自信がつきました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたの', '彼女に', '彼は'],
      jpToEn: ['your', 'you', 'he'],
    },
  },
  {
    term: 'your',
    ipa: '/jʊr/',
    jp: 'あなたの',
    examples: [
      { en: 'Is this your book?', jp: 'これはあなたの本ですか？', level: 1 },
      { en: 'Your phone is ringing.', jp: 'あなたの電話が鳴っています。', level: 2 },
      {
        en: 'Your idea has helped the team a lot.',
        jp: 'あなたのアイデアはチームにとても役立ちました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたのもの', 'あなたは', 'あなた自身'],
      jpToEn: ['yours', 'you', 'yourself'],
    },
  },
  {
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたを、あなたに',
    examples: [
      { en: 'I can help you.', jp: '私はあなたを手伝えます。', level: 1 },
      { en: "I'll text you later.", jp: '後であなたにメッセージを送ります。', level: 2 },
      {
        en: 'The teacher asked you to present first.',
        jp: '先生はあなたに最初に発表するよう頼みました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたの', 'あなたのもの', 'あなた自身'],
      jpToEn: ['your', 'yours', 'yourself'],
    },
  },
  {
    term: 'yours',
    ipa: '/jʊrz/',
    jp: 'あなたのもの',
    examples: [
      { en: 'Is this pencil yours?', jp: 'このえんぴつはあなたのものですか？', level: 1 },
      { en: 'That seat is yours.', jp: 'あの席はあなたのものです。', level: 2 },
      {
        en: 'The final decision is yours.',
        jp: '最終決定はあなたのものです（あなたが決めます）。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたの', 'あなたを、あなたに', 'あなたたちのもの'],
      jpToEn: ['your', 'you', 'yours'],
    },
  },
  {
    term: 'yourself',
    ipa: '/jʊrˈsɛlf/',
    jp: 'あなた自身',
    examples: [
      { en: 'You can do it by yourself.', jp: 'あなたは一人でそれができます。', level: 1 },
      { en: 'Please take care of yourself.', jp: '自分の体に気をつけてください。', level: 2 },
      {
        en: 'You challenged yourself to run a marathon.',
        jp: 'あなたはマラソンに挑戦しました（自分自身に課しました）。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたの', 'あなたたち自身', '彼女自身'],
      jpToEn: ['your', 'yourselves', 'herself'],
    },
  },

  {
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたたちは',
    examples: [
      { en: 'You all are early today.', jp: 'あなたたちは今日は早いですね。', level: 1 },
      {
        en: 'You are practicing hard these days.',
        jp: 'あなたたちは最近、一生けん命練習しています。',
        level: 2,
      },
      {
        en: 'You have been working together for months.',
        jp: 'あなたたちは数か月間、一緒に取り組んできました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたたちの', 'あなたの', '彼らは'],
      jpToEn: ['your', 'you', 'they'],
    },
  },
  {
    term: 'your',
    ipa: '/jʊr/',
    jp: 'あなたたちの',
    examples: [
      { en: 'Is this your classroom?', jp: 'これはあなたたちの教室ですか？', level: 1 },
      { en: 'Your club starts at four.', jp: 'あなたたちのクラブは4時に始まります。', level: 2 },
      {
        en: 'Your efforts have made a big difference.',
        jp: 'あなたたちの努力は大きな違いを生みました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたたちのもの', 'あなたたちは', 'あなたたち自身'],
      jpToEn: ['yours', 'you', 'yourselves'],
    },
  },
  {
    term: 'you',
    ipa: '/juː/',
    jp: 'あなたたちを、あなたたちに',
    examples: [
      { en: 'I will help you after school.', jp: '放課後にあなたたちを手伝います。', level: 1 },
      {
        en: 'The teacher gave you a quiz.',
        jp: '先生はあなたたちに小テストを出しました。',
        level: 2,
      },
      {
        en: 'I invited you to our event.',
        jp: '私はあなたたちを私たちのイベントに招待しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたたちの', 'あなたたちのもの', 'あなたたち自身'],
      jpToEn: ['your', 'yours', 'you'],
    },
  },
  {
    term: 'yours',
    ipa: '/jʊrz/',
    jp: 'あなたたちのもの',
    examples: [
      {
        en: 'Are these notebooks yours?',
        jp: 'これらのノートはあなたたちのものですか？',
        level: 1,
      },
      { en: 'The front seats are yours.', jp: '前の席はあなたたちのものです。', level: 2 },
      { en: 'The choice is yours.', jp: '選択はあなたたちに任されています。', level: 3 },
    ],
    choices: {
      enToJp: ['あなたたちの', 'あなたたちを、あなたたちに', '彼らのもの'],
      jpToEn: ['your', 'you', 'theirs'],
    },
  },
  {
    term: 'yourselves',
    ipa: '/jʊrˈsɛlvz/',
    jp: 'あなたたち自身',
    examples: [
      { en: 'Please line up by yourselves.', jp: '自分たちで並んでください。', level: 1 },
      {
        en: 'Please introduce yourselves to the class.',
        jp: 'クラスに自分たちの紹介をしてください。',
        level: 2,
      },
      {
        en: 'You prepared yourselves well for the contest.',
        jp: 'あなたたちは大会に向けてしっかり準備しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['あなたたちの', 'あなたたちを、あなたたちに', '彼ら自身'],
      jpToEn: ['your', 'ourselves', 'themselves'],
    },
  },

  {
    term: 'he',
    ipa: '/hiː/',
    jp: '彼は',
    examples: [
      { en: 'He is my brother.', jp: '彼は私の兄です。', level: 1 },
      { en: 'He plays soccer after school.', jp: '彼は放課後にサッカーをします。', level: 2 },
      {
        en: 'He has lived in Osaka for five years.',
        jp: '彼は5年間大阪に住んでいます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['彼の', '彼を、彼に', '彼女は'],
      jpToEn: ['his', 'him', 'she'],
    },
  },
  {
    term: 'his',
    ipa: '/hɪz/',
    jp: '彼の',
    examples: [
      { en: 'This is his bike.', jp: 'これは彼の自転車です。', level: 1 },
      { en: 'His father works in Tokyo.', jp: '彼のお父さんは東京で働いています。', level: 2 },
      { en: 'His advice has been helpful.', jp: '彼の助言は役に立ってきました。', level: 3 },
    ],
    choices: {
      enToJp: ['彼を、彼に', '彼は', '彼自身'],
      jpToEn: ['his', 'he', 'himself'],
    },
  },
  {
    term: 'him',
    ipa: '/hɪm/',
    jp: '彼を、彼に',
    examples: [
      { en: 'I saw him at the station.', jp: '駅で彼を見ました。', level: 1 },
      { en: 'Please give him this note.', jp: 'このメモを彼に渡してください。', level: 2 },
      { en: 'Everyone respects him.', jp: 'みんなが彼を尊敬しています。', level: 3 },
    ],
    choices: {
      enToJp: ['彼は', '彼のもの', '彼女を、彼女に'],
      jpToEn: ['he', 'his', 'her'],
    },
  },
  {
    term: 'his',
    ipa: '/hɪz/',
    jp: '彼のもの',
    examples: [
      { en: 'This seat is his.', jp: 'この席は彼のものです。', level: 1 },
      { en: 'That pencil case is his.', jp: 'あのペンケースは彼のものです。', level: 2 },
      { en: 'The final decision is his.', jp: '最終的な決定は彼のものです。', level: 3 },
    ],
    choices: {
      enToJp: ['彼は', '彼を、彼に', '彼女のもの'],
      jpToEn: ['his', 'him', 'hers'],
    },
  },
  {
    term: 'himself',
    ipa: '/hɪmˈsɛlf/',
    jp: '彼自身',
    examples: [
      { en: 'He cut the cake by himself.', jp: '彼は一人でケーキを切りました。', level: 1 },
      { en: 'He taught himself guitar.', jp: '彼は独学でギターを学びました。', level: 2 },
      {
        en: 'He blamed himself for the mistake.',
        jp: '彼はその間違いを自分のせいだと責めました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['彼の', '彼ら自身', '彼女自身'],
      jpToEn: ['his', 'themselves', 'herself'],
    },
  },

  {
    term: 'she',
    ipa: '/ʃiː/',
    jp: '彼女は',
    examples: [
      { en: 'She is my sister.', jp: '彼女は私の妹です。', level: 1 },
      { en: 'She is studying in the library.', jp: '彼女は図書館で勉強しています。', level: 2 },
      { en: 'She has visited Kyoto many times.', jp: '彼女は何度も京都を訪れています。', level: 3 },
    ],
    choices: {
      enToJp: ['彼女の', '彼女を、彼女に', '彼は'],
      jpToEn: ['her', 'her', 'he'],
    },
  },
  {
    term: 'her',
    ipa: '/hɝː/',
    jp: '彼女の',
    examples: [
      { en: 'Her bag is red.', jp: '彼女のカバンは赤いです。', level: 1 },
      { en: 'Her parents are doctors.', jp: '彼女の両親は医者です。', level: 2 },
      { en: 'Her idea has changed the plan.', jp: '彼女の考えで計画が変わりました。', level: 3 },
    ],
    choices: {
      enToJp: ['彼女のもの', '彼女は', '彼女自身'],
      jpToEn: ['hers', 'she', 'herself'],
    },
  },
  {
    term: 'her',
    ipa: '/hɝː/',
    jp: '彼女を、彼女に',
    examples: [
      { en: 'I called her yesterday.', jp: '私は昨日彼女に電話しました。', level: 1 },
      { en: 'Please tell her the time.', jp: '彼女に時間を伝えてください。', level: 2 },
      { en: 'We chose her as the leader.', jp: '私たちは彼女をリーダーに選びました。', level: 3 },
    ],
    choices: {
      enToJp: ['彼女は', '彼女のもの', '彼女自身'],
      jpToEn: ['her', 'hers', 'herself'],
    },
  },
  {
    term: 'hers',
    ipa: '/hɝːz/',
    jp: '彼女のもの',
    examples: [
      { en: 'This umbrella is hers.', jp: 'この傘は彼女のものです。', level: 1 },
      { en: 'Those keys are hers.', jp: 'あの鍵は彼女のものです。', level: 2 },
      { en: 'The victory is hers.', jp: 'その勝利は彼女のものです。', level: 3 },
    ],
    choices: {
      enToJp: ['彼女の', '彼女を、彼女に', '彼のもの'],
      jpToEn: ['her', 'her', 'his'],
    },
  },
  {
    term: 'herself',
    ipa: '/hɝːˈsɛlf/',
    jp: '彼女自身',
    examples: [
      { en: 'She made it herself.', jp: '彼女はそれを自分で作りました。', level: 1 },
      {
        en: 'She introduced herself in English.',
        jp: '彼女は英語で自己紹介をしました。',
        level: 2,
      },
      {
        en: 'She taught herself to code.',
        jp: '彼女は独学でプログラミングを学びました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['彼女の', '彼ら自身', '私自身'],
      jpToEn: ['her', 'themselves', 'myself'],
    },
  },

  {
    term: 'it',
    ipa: '/ɪt/',
    jp: 'それは',
    examples: [
      { en: 'It is rainy today.', jp: '今日は雨です。', level: 1 },
      { en: 'It looks fun.', jp: 'それは楽しそうです。', level: 2 },
      { en: 'It has become colder recently.', jp: '最近、寒くなってきました。', level: 3 },
    ],
    choices: {
      enToJp: ['あれの', 'それの', 'それ自身'],
      jpToEn: ['it', 'its', 'itself'],
    },
  },
  {
    term: 'its',
    ipa: '/ɪts/',
    jp: 'それの',
    examples: [
      { en: 'The dog wagged its tail.', jp: '犬はしっぽを振りました。', level: 1 },
      { en: 'This town is known for its river.', jp: 'この町は川で知られています。', level: 2 },
      { en: 'The company changed its policy.', jp: 'その会社は方針を変えました。', level: 3 },
    ],
    choices: {
      enToJp: ['それは', 'それを、それに', 'それ自身'],
      jpToEn: ['it', 'it', 'itself'],
    },
  },
  {
    term: 'it',
    ipa: '/ɪt/',
    jp: 'それを、それに',
    examples: [
      { en: 'I like it.', jp: '私はそれが好きです。', level: 1 },
      { en: 'I found it online.', jp: '私はそれをオンラインで見つけました。', level: 2 },
      { en: 'I considered it carefully.', jp: '私はそれを慎重に考えました。', level: 3 },
    ],
    choices: {
      enToJp: ['あれは', 'それの', 'それ自身'],
      jpToEn: ['it', 'its', 'itself'],
    },
  },
  {
    term: 'itself',
    ipa: '/ɪtˈsɛlf/',
    jp: 'それ自身',
    examples: [
      { en: 'The door opened by itself.', jp: 'ドアは自然に開きました。', level: 1 },
      {
        en: 'The machine stops by itself at night.',
        jp: 'その機械は夜に自動で止まります。',
        level: 2,
      },
      {
        en: 'The problem solved itself after the update.',
        jp: 'アップデート後、その問題は自然に解決しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['それの', '彼ら自身', '私自身'],
      jpToEn: ['its', 'themselves', 'myself'],
    },
  },

  {
    term: 'they',
    ipa: '/ðeɪ/',
    jp: '彼らは',
    examples: [
      { en: 'They are classmates.', jp: '彼らはクラスメイトです。', level: 1 },
      {
        en: 'They are playing basketball now.',
        jp: '彼らは今バスケットボールをしています。',
        level: 2,
      },
      {
        en: 'They have traveled to many countries.',
        jp: '彼らは多くの国を旅行したことがあります。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['彼らの', '彼らを、彼らに', '私たちは'],
      jpToEn: ['their', 'them', 'we'],
    },
  },
  {
    term: 'their',
    ipa: '/ðɛr/',
    jp: '彼らの',
    examples: [
      { en: 'Their house is big.', jp: '彼らの家は大きいです。', level: 1 },
      { en: 'Their teacher is kind.', jp: '彼らの先生は親切です。', level: 2 },
      { en: 'Their efforts have paid off.', jp: '彼らの努力は実を結びました。', level: 3 },
    ],
    choices: {
      enToJp: ['彼らのもの', '彼らは', '彼ら自身'],
      jpToEn: ['theirs', 'they', 'themselves'],
    },
  },
  {
    term: 'them',
    ipa: '/ðɛm/',
    jp: '彼らを、彼らに',
    examples: [
      { en: 'I saw them on the train.', jp: '電車で彼らを見ました。', level: 1 },
      { en: 'Please give them water.', jp: '彼らに水をあげてください。', level: 2 },
      { en: 'I asked them to join us.', jp: '私は彼らに一緒に参加するよう頼みました。', level: 3 },
    ],
    choices: {
      enToJp: ['彼らの', '彼らのもの', '彼らは'],
      jpToEn: ['their', 'theirs', 'they'],
    },
  },
  {
    term: 'theirs',
    ipa: '/ðɛrz/',
    jp: '彼らのもの',
    examples: [
      { en: 'This ball is theirs.', jp: 'このボールは彼らのものです。', level: 1 },
      { en: 'The seats near the front are theirs.', jp: '前の方の席は彼らのものです。', level: 2 },
      { en: 'The win is theirs this time.', jp: '今回は彼らの勝ちです。', level: 3 },
    ],
    choices: {
      enToJp: ['彼らの', '彼らを、彼らに', '私たちのもの'],
      jpToEn: ['their', 'them', 'ours'],
    },
  },
  {
    term: 'themselves',
    ipa: '/ðɛmˈsɛlvz/',
    jp: '彼ら自身',
    examples: [
      {
        en: 'They cooked dinner by themselves.',
        jp: '彼らは自分たちで夕食を作りました。',
        level: 1,
      },
      {
        en: 'They introduced themselves to the new teacher.',
        jp: '彼らは新しい先生に自己紹介しました。',
        level: 2,
      },
      {
        en: 'They pushed themselves to the limit.',
        jp: '彼らは限界まで自分たちを追い込みました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['彼らのもの', 'あなたたち自身', '彼自身'],
      jpToEn: ['theirs', 'yourselves', 'himself'],
    },
  },
];

export const DATA_RAW_SOURCE2: RawPronounItem[] = [
  // 02. Indefinite (person/thing)
  {
    term: 'someone',
    ipa: '/ˈsʌmˌwʌn/',
    jp: '誰か',
    examples: [
      { en: 'Someone is at the door.', jp: '誰かがドアのところにいます。', level: 1 },
      { en: 'Someone called me last night.', jp: '昨夜、誰かが私に電話をしました。', level: 2 },
      { en: 'Someone has taken my seat.', jp: '誰かが私の席を取ってしまいました。', level: 3 },
    ],
    choices: {
      enToJp: ['誰でも、誰か', 'みんな', '誰も〜ない'],
      jpToEn: ['anyone', 'everyone', 'no one'],
    },
  },
  {
    term: 'somebody',
    ipa: '/ˈsʌmˌbɑːdi/',
    jp: '誰か',
    examples: [
      { en: 'Somebody dropped this card.', jp: '誰かがこのカードを落としました。', level: 1 },
      { en: 'Somebody will help you soon.', jp: '誰かがすぐあなたを手伝ってくれます。', level: 2 },
      {
        en: 'Somebody has already cleaned the room.',
        jp: '誰かがすでに部屋を掃除しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['みんな', '誰でも、誰か', '誰も〜ない'],
      jpToEn: ['everyone', 'anyone', 'nobody'],
    },
  },
  {
    term: 'something',
    ipa: '/ˈsʌmˌθɪŋ/',
    jp: '何か',
    examples: [
      { en: 'I want something to drink.', jp: '何か飲み物が欲しいです。', level: 1 },
      { en: 'Something smells good.', jp: '何かいい匂いがします。', level: 2 },
      { en: 'Something has changed recently.', jp: '最近、何かが変わりました。', level: 3 },
    ],
    choices: {
      enToJp: ['何でも、何か', 'すべて', '何も〜ない'],
      jpToEn: ['anything', 'everything', 'nothing'],
    },
  },

  {
    term: 'anyone',
    ipa: '/ˈɛniˌwʌn/',
    jp: '誰でも、誰か',
    examples: [
      { en: 'Anyone can join.', jp: '誰でも参加できます。', level: 1 },
      { en: 'Did anyone see my pen?', jp: '誰か私のペンを見ましたか？', level: 2 },
      {
        en: 'If anyone needs help, let me know.',
        jp: 'もし誰か助けが必要なら知らせてください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['誰か', 'みんな', '誰も〜ない'],
      jpToEn: ['someone', 'everyone', 'no one'],
    },
  },
  {
    term: 'anybody',
    ipa: '/ˈɛniˌbɑːdi/',
    jp: '誰でも、誰か',
    examples: [
      { en: 'Is anybody here?', jp: '誰かここにいますか？', level: 1 },
      { en: 'Anybody can try this game.', jp: '誰でもこのゲームを試せます。', level: 2 },
      {
        en: 'If anybody has questions, ask me later.',
        jp: 'もし質問がある人は、後で私に聞いてください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['誰か', 'みんな', '誰も〜ない'],
      jpToEn: ['somebody', 'everybody', 'nobody'],
    },
  },
  {
    term: 'anything',
    ipa: '/ˈɛniˌθɪŋ/',
    jp: '何でも、何か',
    examples: [
      { en: 'Do you want anything?', jp: '何か欲しいですか？', level: 1 },
      { en: 'You can buy anything at that store.', jp: 'その店では何でも買えます。', level: 2 },
      {
        en: 'If anything goes wrong, call me.',
        jp: 'もし何か問題が起きたら、私に電話してください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['何か', 'すべて', '何も〜ない'],
      jpToEn: ['something', 'everything', 'nothing'],
    },
  },

  {
    term: 'everyone',
    ipa: '/ˈɛvriˌwʌn/',
    jp: 'みんな',
    examples: [
      { en: 'Everyone is here.', jp: 'みんなここにいます。', level: 1 },
      { en: 'Everyone enjoyed the game.', jp: 'みんながその試合を楽しみました。', level: 2 },
      { en: 'Everyone has done their homework.', jp: 'みんな宿題を終えています。', level: 3 },
    ],
    choices: {
      enToJp: ['誰か', '誰でも、誰か', '誰も〜ない'],
      jpToEn: ['someone', 'anyone', 'no one'],
    },
  },
  {
    term: 'everybody',
    ipa: '/ˈɛvriˌbɑːdi/',
    jp: 'みんな',
    examples: [
      { en: 'Everybody likes music.', jp: 'みんな音楽が好きです。', level: 1 },
      {
        en: 'Everybody was excited yesterday.',
        jp: '昨日はみんながわくわくしていました。',
        level: 2,
      },
      { en: 'Everybody has arrived on time.', jp: 'みんな時間どおりに到着しました。', level: 3 },
    ],
    choices: {
      enToJp: ['誰か', '誰でも、誰か', '誰も〜ない'],
      jpToEn: ['somebody', 'anybody', 'nobody'],
    },
  },
  {
    term: 'everything',
    ipa: '/ˈɛvriˌθɪŋ/',
    jp: 'すべて',
    examples: [
      { en: 'Everything is okay.', jp: 'すべて大丈夫です。', level: 1 },
      { en: 'Everything looks new.', jp: 'すべて新しく見えます。', level: 2 },
      { en: 'Everything has been prepared.', jp: 'すべて準備ができています。', level: 3 },
    ],
    choices: {
      enToJp: ['何でも、何か', '何か', '何も〜ない'],
      jpToEn: ['anything', 'something', 'nothing'],
    },
  },

  {
    term: 'no one',
    ipa: '/ˈnoʊ ˌwʌn/',
    jp: '誰も〜ない',
    examples: [
      { en: 'No one is in the room.', jp: '部屋には誰もいません。', level: 1 },
      { en: 'No one answered the phone.', jp: '電話に誰も出ませんでした。', level: 2 },
      {
        en: 'No one has solved the puzzle yet.',
        jp: 'まだ誰もそのパズルを解いていません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['誰か', 'みんな', '誰でも、誰か'],
      jpToEn: ['someone', 'everyone', 'anyone'],
    },
  },
  {
    term: 'nobody',
    ipa: '/ˈnoʊˌbɑːdi/',
    jp: '誰も〜ない',
    examples: [
      { en: 'Nobody knows the answer.', jp: '答えを知っている人はいません。', level: 1 },
      {
        en: 'Nobody came to the club yesterday.',
        jp: '昨日はクラブに誰も来ませんでした。',
        level: 2,
      },
      {
        en: 'Nobody has finished the task yet.',
        jp: 'まだ誰もその課題を終えていません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['誰か', 'みんな', '誰でも、誰か'],
      jpToEn: ['somebody', 'everybody', 'anybody'],
    },
  },
  {
    term: 'nothing',
    ipa: '/ˈnʌθɪŋ/',
    jp: '何も〜ない',
    examples: [
      { en: 'Nothing is in the box.', jp: '箱の中には何もありません。', level: 1 },
      { en: 'Nothing changed yesterday.', jp: '昨日は何も変わりませんでした。', level: 2 },
      { en: 'Nothing has been decided yet.', jp: 'まだ何も決まっていません。', level: 3 },
    ],
    choices: {
      enToJp: ['何か', 'すべて', '何でも、何か'],
      jpToEn: ['something', 'everything', 'anything'],
    },
  },
];

export const DATA_RAW_SOURCE3: RawPronounItem[] = [
  {
    term: 'one',
    ipa: '/wʌn/',
    jp: '一人、もの',
    examples: [
      { en: 'One is missing.', jp: '一つ足りません。', level: 1 },
      { en: 'Take one and pass it on.', jp: '一つ取って次の人に回してください。', level: 2 },
      {
        en: 'One of my friends has moved to Nagoya.',
        jp: '友だちの一人が名古屋に引っ越しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['他の', 'いくつかの', '両方'],
      jpToEn: ['another', 'other', 'both'],
    },
  },
  {
    term: 'another',
    ipa: '/əˈnʌðɚ/',
    jp: 'もう一つの、別の',
    examples: [
      { en: 'I want another apple.', jp: 'もう一つリンゴが欲しいです。', level: 1 },
      { en: 'Can I have another chance?', jp: 'もう一度チャンスをもらえますか？', level: 2 },
      {
        en: "Let's try another way to solve it.",
        jp: 'それを解く別の方法を試しましょう。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['他の', 'ほとんどの', '同じもの、こと'],
      jpToEn: ['other', 'most', 'same'],
    },
  },
  {
    term: 'other',
    ipa: '/ˈʌðɚ/',
    jp: '他の',
    examples: [
      { en: 'Show me other pictures.', jp: '他の写真を見せてください。', level: 1 },
      { en: 'Other people are waiting.', jp: '他の人たちが待っています。', level: 2 },
      { en: 'Other options have been suggested.', jp: '他の選択肢が提案されています。', level: 3 },
    ],
    choices: {
      enToJp: ['もう一つの、別の', 'それぞれ', '両方'],
      jpToEn: ['another', 'each', 'both'],
    },
  },
  {
    term: 'others',
    ipa: '/ˈʌðɚz/',
    jp: '他のもの、人々',
    examples: [
      { en: 'Help others.', jp: '他の人を助けましょう。', level: 1 },
      { en: 'Some study; others play.', jp: '勉強する人もいれば、遊ぶ人もいます。', level: 2 },
      { en: 'Others have already left.', jp: '他の人たちはすでに出発しました。', level: 3 },
    ],
    choices: {
      enToJp: ['同じもの、こと', 'どちらか', 'すべて'],
      jpToEn: ['same', 'either', 'all'],
    },
  },
  {
    term: 'each',
    ipa: '/itʃ/',
    jp: 'それぞれ',
    examples: [
      { en: 'Each student has a desk.', jp: '生徒はそれぞれ机があります。', level: 1 },
      {
        en: 'We gave each person a number.',
        jp: '私たちは一人ひとりに番号を渡しました。',
        level: 2,
      },
      {
        en: 'Each of them has finished their work.',
        jp: '彼らはそれぞれ自分の作業を終えています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['両方', 'どちらか', 'どちらも〜ない'],
      jpToEn: ['both', 'either', 'neither'],
    },
  },
  {
    term: 'either',
    ipa: '/ˈiðɚ/',
    jp: 'どちらか',
    examples: [
      { en: 'Either is fine.', jp: 'どちらでも大丈夫です。', level: 1 },
      { en: 'You can choose either book.', jp: 'どちらの本でも選べます。', level: 2 },
      {
        en: 'Either of the answers is acceptable.',
        jp: 'どちらの答えでも受け入れられます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['どちらも〜ない', '両方', 'それぞれ'],
      jpToEn: ['neither', 'both', 'each'],
    },
  },
  {
    term: 'neither',
    ipa: '/ˈniðɚ/',
    jp: 'どちらも〜ない',
    examples: [
      { en: 'Neither is correct.', jp: 'どちらも正しくありません。', level: 1 },
      {
        en: 'Neither team won yesterday.',
        jp: '昨日はどちらのチームも勝ちませんでした。',
        level: 2,
      },
      {
        en: 'Neither of us has finished yet.',
        jp: '私たちのどちらもまだ終わっていません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['どちらか', '両方', 'すべて'],
      jpToEn: ['either', 'both', 'all'],
    },
  },
  {
    term: 'none',
    ipa: '/nʌn/',
    jp: 'どれも〜ない、誰も〜ない',
    examples: [
      { en: 'None are left.', jp: '残りは一つもありません。', level: 1 },
      { en: 'None of the cookies are left.', jp: 'クッキーは一つも残っていません。', level: 2 },
      { en: 'None of them have arrived yet.', jp: '彼らはまだ誰も到着していません。', level: 3 },
    ],
    choices: {
      enToJp: ['いくつかの', 'すべて', '両方'],
      jpToEn: ['some', 'all', 'both'],
    },
  },
  {
    term: 'some',
    ipa: '/sʌm/',
    jp: 'いくつかの',
    examples: [
      { en: 'I have some.', jp: '私はいくつか持っています。', level: 1 },
      { en: 'Would you like some?', jp: '少しいかがですか？', level: 2 },
      {
        en: 'Some of the ideas have been chosen.',
        jp: 'アイデアのいくつかが選ばれました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['どれも〜ない、誰も〜ない', 'すべて', 'ほとんどの'],
      jpToEn: ['none', 'all', 'most'],
    },
  },
  {
    term: 'any',
    ipa: '/ˈɛni/',
    jp: 'いくらか、どれか',
    examples: [
      { en: "I don't have any.", jp: '私は一つも持っていません。', level: 1 },
      { en: 'Do you have any time?', jp: '少し時間はありますか？', level: 2 },
      {
        en: 'If you have any questions, ask later.',
        jp: 'もし質問があれば、後で聞いてください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['いくつかの', 'すべて', 'ほとんど〜ない（可算）'],
      jpToEn: ['some', 'all', 'few'],
    },
  },
  {
    term: 'certain',
    ipa: '/ˈsɝːtn/',
    jp: 'ある人々',
    examples: [
      {
        en: 'Certain students are absent today.',
        jp: '今日は特定の生徒が欠席しています。',
        level: 1,
      },
      { en: 'I have a certain plan in mind.', jp: '私はある計画を心に決めています。', level: 2 },
      {
        en: 'Certain areas have been closed for safety.',
        jp: '安全のため、特定の区域が閉鎖されています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['すべて', '他の', '同じもの、こと'],
      jpToEn: ['all', 'other', 'same'],
    },
  },
  {
    term: 'all',
    ipa: '/ɔl/',
    jp: 'すべて',
    examples: [
      { en: 'All are welcome.', jp: '誰でも歓迎です。', level: 1 },
      { en: 'All the students are here.', jp: '生徒は全員ここにいます。', level: 2 },
      { en: 'All of us have finished.', jp: '私たちは全員終わりました。', level: 3 },
    ],
    choices: {
      enToJp: ['いくつかの', 'ほとんどの', '両方'],
      jpToEn: ['some', 'most', 'both'],
    },
  },
  {
    term: 'both',
    ipa: '/boʊθ/',
    jp: '両方',
    examples: [
      { en: 'Both are ready.', jp: '両方とも準備ができています。', level: 1 },
      { en: 'Both teams practiced hard.', jp: '両チームとも一生けん命練習しました。', level: 2 },
      { en: 'Both of them have improved a lot.', jp: '彼ら二人はとても上達しました。', level: 3 },
    ],
    choices: {
      enToJp: ['どちらか', 'どちらも〜ない', 'すべて'],
      jpToEn: ['either', 'neither', 'all'],
    },
  },
  {
    term: 'most',
    ipa: '/moʊst/',
    jp: 'ほとんどの',
    examples: [
      { en: 'Most students like music.', jp: 'ほとんどの生徒は音楽が好きです。', level: 1 },
      { en: 'Most of my friends play games.', jp: '友だちのほとんどはゲームをします。', level: 2 },
      { en: 'Most of the work has been done.', jp: '作業のほとんどは終わっています。', level: 3 },
    ],
    choices: {
      enToJp: ['いくつかの', 'すべて', 'より少ない'],
      jpToEn: ['some', 'all', 'less'],
    },
  },
  {
    term: 'more',
    ipa: '/mɔr/',
    jp: 'もっと多くの',
    examples: [
      { en: 'I need more.', jp: 'もっと必要です。', level: 1 },
      { en: 'We need more chairs.', jp: 'もっとイスが必要です。', level: 2 },
      {
        en: 'We need more information to decide.',
        jp: '判断するにはもっと情報が必要です。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['より少ない', '最小、最も少ない', '十分な'],
      jpToEn: ['less', 'least', 'enough'],
    },
  },
  {
    term: 'many',
    ipa: '/ˈmɛni/',
    jp: '多くの（可算）',
    examples: [
      { en: 'Many people came.', jp: '多くの人が来ました。', level: 1 },
      { en: 'Many students joined the club.', jp: '多くの生徒がクラブに入りました。', level: 2 },
      {
        en: 'Many of them have visited Tokyo.',
        jp: '彼らの多くは東京を訪れたことがあります。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['多くの（不可算）', 'いくつかの', 'ほとんど〜ない（可算）'],
      jpToEn: ['much', 'several', 'few'],
    },
  },
  {
    term: 'much',
    ipa: '/mʌtʃ/',
    jp: '多くの（不可算）',
    examples: [
      { en: "I don't have much time.", jp: '私は時間があまりありません。', level: 1 },
      {
        en: "There isn't much milk in the fridge.",
        jp: '冷蔵庫に牛乳があまりありません。',
        level: 2,
      },
      { en: 'Much has changed since spring.', jp: '春以来、多くのことが変わりました。', level: 3 },
    ],
    choices: {
      enToJp: ['多くの（可算）', 'より少ない', '最小、最も少ない'],
      jpToEn: ['many', 'less', 'least'],
    },
  },
  {
    term: 'several',
    ipa: '/ˈsɛvrəl/',
    jp: 'いくつかの',
    examples: [
      { en: 'Several students are absent.', jp: '何人かの生徒が欠席しています。', level: 1 },
      {
        en: 'I visited several places last weekend.',
        jp: '先週末にいくつかの場所を訪れました。',
        level: 2,
      },
      {
        en: 'Several of the plans have been canceled.',
        jp: 'いくつかの計画が中止されました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['ほとんどの', '多くの（不可算）', 'いくらか、どれか'],
      jpToEn: ['most', 'much', 'any'],
    },
  },
  {
    term: 'few',
    ipa: '/fjuː/',
    jp: 'ほとんど〜ない（可算）',
    examples: [
      { en: 'Few buses come at night.', jp: '夜はバスがほとんど来ません。', level: 1 },
      {
        en: 'I have few chances to speak English.',
        jp: '英語を話す機会がほとんどありません。',
        level: 2,
      },
      {
        en: 'Few of us have finished the report.',
        jp: '私たちの中でレポートを終えた人はほとんどいません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['ほとんど〜ない（不可算）', '多くの（可算）', 'すべて'],
      jpToEn: ['little', 'many', 'all'],
    },
  },
  {
    term: 'little',
    ipa: '/ˈlɪtl/',
    jp: 'ほとんど〜ない（不可算）',
    examples: [
      { en: 'I have little money.', jp: '私はお金がほとんどありません。', level: 1 },
      {
        en: 'There is little time before the test.',
        jp: 'テストまでほとんど時間がありません。',
        level: 2,
      },
      {
        en: 'There is little hope of success.',
        jp: '成功の見込みはほとんどありません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['ほとんど〜ない（可算）', '多くの（不可算）', 'いくつかの'],
      jpToEn: ['few', 'much', 'several'],
    },
  },
  {
    term: 'less',
    ipa: '/lɛs/',
    jp: 'より少ない',
    examples: [
      { en: 'I need less salt.', jp: '塩はもっと少なくていいです。', level: 1 },
      { en: 'We have less time today.', jp: '今日は時間がより少ないです。', level: 2 },
      { en: 'We spent less than last year.', jp: '私たちは昨年より少なく使いました。', level: 3 },
    ],
    choices: {
      enToJp: ['もっと多くの', '最小、最も少ない', '十分な'],
      jpToEn: ['more', 'least', 'enough'],
    },
  },
  {
    term: 'least',
    ipa: '/list/',
    jp: '最小、最も少ない',
    examples: [
      { en: 'I like this the least.', jp: '私はこれが一番好きではありません。', level: 1 },
      { en: 'This is the least useful item.', jp: 'これは最も役に立たない品です。', level: 2 },
      {
        en: 'She was the least affected by the change.',
        jp: '彼女はその変化の影響を最も受けませんでした。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['より少ない', 'もっと多くの', '同じもの、こと'],
      jpToEn: ['less', 'more', 'same'],
    },
  },
  {
    term: 'enough',
    ipa: '/ɪˈnʌf/',
    jp: '十分な',
    examples: [
      { en: 'I have enough.', jp: '私は十分持っています。', level: 1 },
      { en: 'We have enough chairs for everyone.', jp: 'みんな分のイスが十分あります。', level: 2 },
      {
        en: 'We have enough time to finish the project.',
        jp: 'そのプロジェクトを終えるのに十分な時間があります。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['より少ない', 'ほとんど〜ない（不可算）', 'いくらか、どれか'],
      jpToEn: ['less', 'little', 'any'],
    },
  },

  // 04. Demonstrative & Other
  {
    term: 'this',
    ipa: '/ðɪs/',
    jp: 'これ',
    examples: [
      { en: 'This is my pen.', jp: 'これは私のペンです。', level: 1 },
      { en: 'This tastes sweet.', jp: 'これは甘い味がします。', level: 2 },
      {
        en: 'This has become my favorite song.',
        jp: 'これは私のお気に入りの曲になりました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['それら、あれら', 'それ、あれ', 'これら'],
      jpToEn: ['those', 'that', 'these'],
    },
  },
  {
    term: 'these',
    ipa: '/ðiːz/',
    jp: 'これら',
    examples: [
      { en: 'These are my shoes.', jp: 'これらは私の靴です。', level: 1 },
      { en: 'These look expensive.', jp: 'これらは高そうに見えます。', level: 2 },
      { en: 'These have been very helpful.', jp: 'これらはとても役立ってきました。', level: 3 },
    ],
    choices: {
      enToJp: ['それ、あれ', 'それら、あれら', 'これ'],
      jpToEn: ['that', 'those', 'this'],
    },
  },
  {
    term: 'that',
    ipa: '/ðæt/',
    jp: 'それ、あれ',
    examples: [
      { en: 'That is our school.', jp: 'あれは私たちの学校です。', level: 1 },
      { en: 'That sounds interesting.', jp: 'それはおもしろそうに聞こえます。', level: 2 },
      { en: 'That has happened before.', jp: 'それは以前にも起きたことがあります。', level: 3 },
    ],
    choices: {
      enToJp: ['これ', 'これら', 'それら、あれら'],
      jpToEn: ['this', 'these', 'those'],
    },
  },
  {
    term: 'those',
    ipa: '/ðoʊz/',
    jp: 'それら、あれら',
    examples: [
      { en: 'Those are new bikes.', jp: 'あれらは新しい自転車です。', level: 1 },
      { en: 'Those look heavy.', jp: 'あれらは重そうに見えます。', level: 2 },
      { en: 'Those have already sold out.', jp: 'あれらはすでに売り切れました。', level: 3 },
    ],
    choices: {
      enToJp: ['これ', 'これら', 'それ、あれ'],
      jpToEn: ['this', 'these', 'that'],
    },
  },
  {
    term: 'such',
    ipa: '/sʌtʃ/',
    jp: 'そのようなもの、こと',
    examples: [
      { en: 'This is such a big dog.', jp: 'これはとても大きな犬です。', level: 1 },
      { en: 'It was such a fun game.', jp: 'とても楽しい試合でした。', level: 2 },
      {
        en: 'Such problems have happened in the past.',
        jp: 'そのような問題は過去にも起きています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['同じもの、こと', 'これら', 'いくつかの'],
      jpToEn: ['same', 'these', 'some'],
    },
  },
  {
    term: 'same',
    ipa: '/seɪm/',
    jp: '同じもの、こと',
    examples: [
      { en: 'I chose the same.', jp: '私は同じものを選びました。', level: 1 },
      { en: 'We have the same idea.', jp: '私たちは同じ考えを持っています。', level: 2 },
      {
        en: 'They arrived at the same time as yesterday.',
        jp: '彼らは昨日と同じ時間に到着しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['そのようなもの、こと', '他の', 'これ'],
      jpToEn: ['such', 'other', 'this'],
    },
  },
];

export const DATA_RAW_SOURCE4: RawPronounItem[] = [
  {
    term: 'this',
    ipa: '/ðɪs/',
    jp: 'これ',
    examples: [
      { en: 'This is my pen.', jp: 'これは私のペンです。', level: 1 },
      { en: 'This tastes sweet.', jp: 'これは甘い味がします。', level: 2 },
      {
        en: 'This has become my favorite song.',
        jp: 'これは私のお気に入りの曲になりました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['それ、あれ', 'これら', 'それら、あれら'],
      jpToEn: ['that', 'these', 'those'],
    },
  },
  {
    term: 'these',
    ipa: '/ðiːz/',
    jp: 'これら',
    examples: [
      { en: 'These are my shoes.', jp: 'これらは私の靴です。', level: 1 },
      { en: 'These look expensive.', jp: 'これらは高そうに見えます。', level: 2 },
      { en: 'These have been very helpful.', jp: 'これらはとても役立ってきました。', level: 3 },
    ],
    choices: {
      enToJp: ['これ', 'それら、あれら', 'それ、あれ'],
      jpToEn: ['this', 'those', 'that'],
    },
  },
  {
    term: 'that',
    ipa: '/ðæt/',
    jp: 'それ、あれ',
    examples: [
      { en: 'That is our school.', jp: 'あれは私たちの学校です。', level: 1 },
      { en: 'That sounds interesting.', jp: 'それはおもしろそうに聞こえます。', level: 2 },
      { en: 'That has happened before.', jp: 'それは以前にも起きたことがあります。', level: 3 },
    ],
    choices: {
      enToJp: ['これ', 'これら', 'それら、あれら'],
      jpToEn: ['this', 'these', 'those'],
    },
  },
  {
    term: 'those',
    ipa: '/ðoʊz/',
    jp: 'それら、あれら',
    examples: [
      { en: 'Those are new bikes.', jp: 'あれらは新しい自転車です。', level: 1 },
      { en: 'Those look heavy.', jp: 'あれらは重そうに見えます。', level: 2 },
      { en: 'Those have already sold out.', jp: 'あれらはすでに売り切れました。', level: 3 },
    ],
    choices: {
      enToJp: ['これ', 'これら', 'それ、あれ'],
      jpToEn: ['this', 'these', 'that'],
    },
  },
  {
    term: 'such',
    ipa: '/sʌtʃ/',
    jp: 'そのようなもの、こと',
    examples: [
      { en: 'This is such a big dog.', jp: 'これはとても大きな犬です。', level: 1 },
      { en: 'It was such a fun game.', jp: 'とても楽しい試合でした。', level: 2 },
      {
        en: 'Such problems have happened in the past.',
        jp: 'そのような問題は過去にも起きています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['同じもの、こと', 'これら', 'いくつかの'],
      jpToEn: ['same', 'these', 'some'],
    },
  },
  {
    term: 'same',
    ipa: '/seɪm/',
    jp: '同じもの、こと',
    examples: [
      { en: 'I chose the same.', jp: '私は同じものを選びました。', level: 1 },
      { en: 'We have the same idea.', jp: '私たちは同じ考えを持っています。', level: 2 },
      {
        en: 'They arrived at the same time as yesterday.',
        jp: '彼らは昨日と同じ時間に到着しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['そのようなもの、こと', '他の', 'これ'],
      jpToEn: ['such', 'other', 'this'],
    },
  },
];
