import { Clock, Hand, Lightbulb, MapPin, Navigation } from 'lucide-react';
import { EnglishWordGroupBase } from './const';
import { RawPronounItem, PronounItem } from '../type';

// 生データに通し番号を付与し、UI 側で扱いやすい `PronounItem` に変換するヘルパー
const withIndex = (raw: RawPronounItem[]): PronounItem[] =>
  raw.map((d, i) => ({
    index: i + 1,
    term: d.term,
    ipa: d.ipa,
    jp: d.jp,
    examples: d.examples,
    choices: {
      enToJp: d.choices.enToJp,
    },
  }));

// 位置の前置詞データ
const POSITION_RAW_DATA: RawPronounItem[] = [
  {
    term: 'at',
    ipa: '/æt/',
    jp: '〜に、〜で（特定の一点、地点）',
    examples: [
      { en: 'I am at school.', jp: '私は学校にいます。', level: 1 },
      { en: 'We met at the station.', jp: '私たちは駅で会いました。', level: 2 },
      { en: 'The meeting starts at 3 p.m.', jp: '会議は午後3時に始まります。', level: 3 },
    ],
    choices: {
      enToJp: [
        '〜の中に（範囲の内側）',
        '〜の上に（接触している状態）',
        '〜のそばに（近接、すぐ脇）',
      ],
    },
  },
  {
    term: 'in',
    ipa: '/ɪn/',
    jp: '〜の中に（範囲の内側）',
    examples: [
      { en: 'The cat is in the box.', jp: '猫は箱の中にいます。', level: 1 },
      { en: 'I live in Tokyo.', jp: '私は東京に住んでいます。', level: 2 },
      {
        en: 'She found her keys in her bag.',
        jp: '彼女はカバンの中に鍵を見つけました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜に、〜で（特定の一点、地点）',
        '〜の上に（接触している状態）',
        '〜の内側に（内部）',
      ],
    },
  },
  {
    term: 'on',
    ipa: '/ɔːn/',
    jp: '〜の上に（接触している状態）',
    examples: [
      { en: 'The book is on the table.', jp: '本はテーブルの上にあります。', level: 1 },
      { en: 'I put a picture on the wall.', jp: '私は壁に絵を掛けました。', level: 2 },
      { en: 'There are many stars on the flag.', jp: '旗にはたくさんの星があります。', level: 3 },
    ],
    choices: {
      enToJp: [
        '〜に、〜で（特定の一点、地点）',
        '〜の中に（範囲の内側）',
        '〜の上方に（接触しない位置）',
      ],
    },
  },
  {
    term: 'above',
    ipa: '/əˈbʌv/',
    jp: '〜の上方に（接触しない位置）',
    examples: [
      { en: 'The plane is above the clouds.', jp: '飛行機は雲の上にあります。', level: 1 },
      { en: 'Hang the picture above the sofa.', jp: 'ソファの上に絵を掛けてください。', level: 2 },
      { en: 'The temperature rose above 30 degrees.', jp: '気温は30度を上回りました。', level: 3 },
    ],
    choices: {
      enToJp: [
        '〜の上に（接触している状態）',
        '〜の下方に（接触なしを含む）',
        '〜の下に（接触、直下を含む）',
      ],
    },
  },
  {
    term: 'below',
    ipa: '/bɪˈloʊ/',
    jp: '〜の下方に（接触なしを含む）',
    examples: [
      { en: 'The fish swims below the boat.', jp: '魚はボートの下を泳いでいます。', level: 1 },
      { en: 'Write your name below the line.', jp: '線の下に名前を書いてください。', level: 2 },
      { en: 'The temperature went below 10 degrees.', jp: '気温は10度を下回りました。', level: 3 },
    ],
    choices: {
      enToJp: [
        '〜の上方に（接触しない位置）',
        '〜の下に（接触、直下を含む）',
        '〜の内側に（内部）',
      ],
    },
  },
  {
    term: 'under',
    ipa: '/ˈʌndɚ/',
    jp: '〜の下に（接触、直下を含む）',
    examples: [
      { en: 'The cat is under the table.', jp: '猫はテーブルの下にいます。', level: 1 },
      { en: 'I found my pen under the book.', jp: '本の下にペンを見つけました。', level: 2 },
      { en: 'The project is under construction.', jp: 'そのプロジェクトは建設中です。', level: 3 },
    ],
    choices: {
      enToJp: [
        '〜の下方に（接触なしを含む）',
        '〜の上方に（接触しない位置）',
        '〜の外側に（外部）',
      ],
    },
  },
  {
    term: 'inside',
    ipa: '/ɪnˈsaɪd/',
    jp: '〜の内側に（内部）',
    examples: [
      { en: 'The keys are inside the drawer.', jp: '鍵は引き出しの中にあります。', level: 1 },
      { en: 'Please wait inside the building.', jp: '建物の中でお待ちください。', level: 2 },
      {
        en: 'I found my pen inside my schoolbag.',
        jp: '学校カバンの中にペンを見つけました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の外側に（外部）', '〜の内側に（空間の範囲内）', '〜の中に（範囲の内側）'],
    },
  },
  {
    term: 'within',
    ipa: '/wɪˈðɪn/',
    jp: '〜の内側に（空間の範囲内）',
    examples: [
      { en: 'Stay within the school grounds.', jp: '学校敷地内にいてください。', level: 1 },
      { en: 'Please reply within three days.', jp: '3日以内に返事をください。', level: 2 },
      {
        en: 'We must finish the work within one week.',
        jp: '私たちは1週間以内に仕事を終えなければなりません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の内側に（内部）', '〜の外側に（外部）', '〜の中に（範囲の内側）'],
    },
  },
  {
    term: 'outside',
    ipa: '/ˌaʊtˈsaɪd/',
    jp: '〜の外側に（外部）',
    examples: [
      { en: 'The dog is outside the house.', jp: '犬は家の外にいます。', level: 1 },
      { en: 'Please wait outside the classroom.', jp: '教室の外で待ってください。', level: 2 },
      {
        en: 'We played soccer outside the school.',
        jp: '私たちは学校の外でサッカーをしました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の内側に（内部）', '〜の内側に（空間の範囲内）', '〜の中に（範囲の内側）'],
    },
  },
  {
    term: 'among',
    ipa: '/əˈmʌŋ/',
    jp: '〜の中に（3つ以上）',
    examples: [
      { en: 'She sat among her friends.', jp: '彼女は友だちの中に座りました。', level: 1 },
      {
        en: 'Choose among these three options.',
        jp: 'この3つの選択肢から選んでください。',
        level: 2,
      },
      {
        en: 'He is popular among his classmates.',
        jp: '彼はクラスメイトの中で人気があります。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の間に（2つの間）', '〜の外側に（外部）', '〜の前方に（対象の外側）'],
    },
  },
  {
    term: 'between',
    ipa: '/bɪˈtwiːn/',
    jp: '〜の間に（2つの間）',
    examples: [
      { en: 'I sit between Tom and Mary.', jp: '私はトムとメアリーの間に座ります。', level: 1 },
      {
        en: 'The store is between the bank and post office.',
        jp: '店は銀行と郵便局の間にあります。',
        level: 2,
      },
      {
        en: 'I have to choose between math and science.',
        jp: '私は数学と理科のどちらかを選ばなければなりません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の中に（3つ以上）', '〜の後ろに（背後）', '〜の向かいに（向かい合う）'],
    },
  },
  {
    term: 'in front of',
    ipa: '/ɪn frʌnt ʌv/',
    jp: '〜の前方に（対象の外側）',
    examples: [
      { en: 'A car is in front of the house.', jp: '車が家の前にあります。', level: 1 },
      { en: 'She stood in front of the mirror.', jp: '彼女は鏡の前に立ちました。', level: 2 },
      {
        en: 'The teacher stood in front of the class.',
        jp: '先生はクラスの前に立ちました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の後ろに（背後）', '〜の向かいに（向かい合う）', '〜の間に（2つの間）'],
    },
  },
  {
    term: 'behind',
    ipa: '/bɪˈhaɪnd/',
    jp: '〜の後ろに（背後）',
    examples: [
      { en: 'The cat hid behind the tree.', jp: '猫は木の後ろに隠れました。', level: 1 },
      { en: 'Please line up behind me.', jp: '私の後ろに並んでください。', level: 2 },
      {
        en: 'My friend walked behind me to school.',
        jp: '友だちは私の後ろを歩いて学校に行きました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の前方に（対象の外側）', '〜の向かいに（向かい合う）', '〜のそばに（横）'],
    },
  },
  {
    term: 'opposite',
    ipa: '/ˈɑːpəzɪt/',
    jp: '〜の向かいに（向かい合う）',
    examples: [
      { en: 'The bank is opposite the school.', jp: '銀行は学校の向かいにあります。', level: 1 },
      {
        en: 'She sat opposite me at the table.',
        jp: '彼女はテーブルで私の向かいに座りました。',
        level: 2,
      },
      {
        en: 'Our opinions are completely opposite.',
        jp: '私たちの意見は全く正反対です。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の前方に（対象の外側）', '〜の後ろに（背後）', '〜に寄りかかって（接触する）'],
    },
  },
  {
    term: 'against',
    ipa: '/əˈɡɛnst/',
    jp: '〜に寄りかかって（接触する）',
    examples: [
      { en: 'Lean the bike against the wall.', jp: '自転車を壁に立てかけてください。', level: 1 },
      {
        en: 'He pressed his face against the window.',
        jp: '彼は顔を窓に押し付けました。',
        level: 2,
      },
      {
        en: 'The team played against strong opponents.',
        jp: 'チームは強い相手と対戦しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の向かいに（向かい合う）', '〜のそばに（横）', '〜のそばに（近接、すぐ脇）'],
    },
  },
  {
    term: 'beside',
    ipa: '/bɪˈsaɪd/',
    jp: '〜のそばに（横）',
    examples: [
      { en: 'She sits beside her friend.', jp: '彼女は友だちのそばに座ります。', level: 1 },
      { en: 'The lamp is beside the bed.', jp: 'ランプはベッドのそばにあります。', level: 2 },
      { en: 'Walk beside me on this path.', jp: 'この道で私のそばを歩いてください。', level: 3 },
    ],
    choices: {
      enToJp: ['〜に寄りかかって（接触する）', '〜のそばに（近接、すぐ脇）', '〜の近くに'],
    },
  },
  {
    term: 'by',
    ipa: '/baɪ/',
    jp: '〜のそばに（近接、すぐ脇）',
    examples: [
      { en: 'I live by the river.', jp: '私は川のそばに住んでいます。', level: 1 },
      { en: 'Please sit by the window.', jp: '窓のそばに座ってください。', level: 2 },
      { en: 'The letter was sent by express mail.', jp: '手紙は速達で送られました。', level: 3 },
    ],
    choices: {
      enToJp: ['〜のそばに（横）', '〜の近くに', '〜の隣に（直近）'],
    },
  },
  {
    term: 'near',
    ipa: '/nɪr/',
    jp: '〜の近くに',
    examples: [
      { en: 'The shop is near my house.', jp: '店は私の家の近くにあります。', level: 1 },
      { en: 'Come near and listen carefully.', jp: '近くに来て、よく聞いてください。', level: 2 },
      { en: 'The test is getting near.', jp: 'テストが近づいてきています。', level: 3 },
    ],
    choices: {
      enToJp: ['〜のそばに（近接、すぐ脇）', '〜の隣に（直近）', '〜から遠い（距離がある）'],
    },
  },
  {
    term: 'next to',
    ipa: '/nɛkst tuː/',
    jp: '〜の隣に（直近）',
    examples: [
      { en: 'I sit next to my friend.', jp: '私は友だちの隣に座ります。', level: 1 },
      { en: 'The library is next to the park.', jp: '図書館は公園の隣にあります。', level: 2 },
      {
        en: 'Please put this next to the others.',
        jp: 'これを他のものの隣に置いてください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の近くに', '〜のそばに（横）', '〜から遠い（距離がある）'],
    },
  },
  {
    term: 'far from',
    ipa: '/fɑːr frʌm/',
    jp: '〜から遠い（距離がある）',
    examples: [
      { en: 'My school is far from home.', jp: '私の学校は家から遠いです。', level: 1 },
      { en: 'The station is far from here.', jp: '駅はここから遠いです。', level: 2 },
      { en: 'Tokyo is far from Osaka.', jp: '東京は大阪から遠いです。', level: 3 },
    ],
    choices: {
      enToJp: ['〜の近くに', '〜の隣に（直近）', '〜のそばに（近接、すぐ脇）'],
    },
  },
];

// 方向の前置詞データ
const DIRECTION_RAW_DATA: RawPronounItem[] = [
  {
    term: 'to',
    ipa: '/tuː/',
    jp: '〜へ、〜まで（到達点、方向）',
    examples: [
      { en: 'I go to school.', jp: '私は学校に行きます。', level: 1 },
      { en: 'We walked to the park.', jp: '私たちは公園まで歩きました。', level: 2 },
      { en: 'The train goes to Tokyo Station.', jp: '電車は東京駅に向かいます。', level: 3 },
    ],
    choices: {
      enToJp: ['〜から（起点、出所）', '〜行き（行き先を示す）', '〜の方へ（方向づけ、接近）'],
    },
  },
  {
    term: 'for',
    ipa: '/fɔːr/',
    jp: '〜行き（行き先を示す）',
    examples: [
      { en: 'This bus is for Tokyo.', jp: 'このバスは東京行きです。', level: 1 },
      { en: 'I bought a ticket for Osaka.', jp: '私は大阪行きの切符を買いました。', level: 2 },
      {
        en: 'The next train for Kyoto leaves at 3 p.m.',
        jp: '京都行きの次の電車は午後3時に出発します。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜へ、〜まで（到達点、方向）',
        '〜から（起点、出所）',
        '〜の方へ（方向づけ、接近）',
      ],
    },
  },
  {
    term: 'toward',
    ipa: '/təˈwɔːrd/',
    jp: '〜の方へ（方向づけ、接近）',
    examples: [
      { en: 'Walk toward the station.', jp: '駅の方へ歩いてください。', level: 1 },
      { en: 'We moved toward the exit.', jp: '私たちは出口の方へ向かいました。', level: 2 },
      {
        en: 'We are moving toward a better future.',
        jp: '私たちはより良い未来に向かって進んでいます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜へ、〜まで（到達点、方向）',
        '〜行き（行き先を示す）',
        '〜から離れて（分離、離脱）',
      ],
    },
  },
  {
    term: 'towards',
    ipa: '/təˈwɔːrdz/',
    jp: '〜の方へ（方向づけ、接近）',
    examples: [
      { en: 'Come towards me.', jp: '私の方へ来てください。', level: 1 },
      { en: 'The cat ran towards me.', jp: '猫は私の方へ走ってきました。', level: 2 },
      {
        en: 'The students walked towards the library.',
        jp: '学生たちは図書館の方へ歩いて行きました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜へ、〜まで（到達点、方向）',
        '〜行き（行き先を示す）',
        '〜から離れて（分離、離脱）',
      ],
    },
  },
  {
    term: 'into',
    ipa: '/ˈɪntuː/',
    jp: '〜の中へ（外→内へ進入）',
    examples: [
      { en: 'Put the book into the bag.', jp: '本をカバンの中に入れてください。', level: 1 },
      { en: 'The cat jumped into the box.', jp: '猫は箱の中に飛び込みました。', level: 2 },
      {
        en: 'Students walked into the classroom.',
        jp: '生徒たちは教室に入って行きました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の外へ、〜の外に（内→外）',
        '〜の上へ（下→上へ移動し接触）',
        '〜から離れて（分離、離脱）',
      ],
    },
  },
  {
    term: 'onto',
    ipa: '/ˈɔːntuː/',
    jp: '〜の上へ（下→上へ移動し接触）',
    examples: [
      { en: 'Jump onto the table.', jp: 'テーブルの上に跳んでください。', level: 1 },
      { en: 'The cat climbed onto the roof.', jp: '猫は屋根の上に登りました。', level: 2 },
      {
        en: 'Please put this book onto the shelf.',
        jp: 'この本を棚の上に置いてください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の中へ（外→内へ進入）', '〜から離れて（分離、離脱）', '〜の下の方へ（下降）'],
    },
  },
  {
    term: 'over',
    ipa: '/ˈoʊvər/',
    jp: '〜を越えて、〜の上を（横断）',
    examples: [
      { en: 'Jump over the fence.', jp: 'フェンスを跳び越えてください。', level: 1 },
      { en: 'The bird flew over the house.', jp: '鳥は家の上を飛んで行きました。', level: 2 },
      {
        en: 'We walked over the bridge to the other side.',
        jp: '私たちは橋を渡って向こう側に行きました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の下の方へ（下降）',
        '〜を通り抜けて（内部を通過）',
        '〜に沿って（線、縁に沿う移動）',
      ],
    },
  },
  {
    term: 'from',
    ipa: '/frʌm/',
    jp: '〜から（起点、出所）',
    examples: [
      { en: 'I come from Japan.', jp: '私は日本から来ました。', level: 1 },
      { en: 'The train from Tokyo is late.', jp: '東京からの電車は遅れています。', level: 2 },
      {
        en: 'We received a letter from our teacher.',
        jp: '私たちは先生から手紙を受け取りました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜へ、〜まで（到達点、方向）',
        '〜から離れて（分離、離脱）',
        '〜行き（行き先を示す）',
      ],
    },
  },
  {
    term: 'off',
    ipa: '/ɔːf/',
    jp: '〜から離れて（分離、離脱）',
    examples: [
      { en: 'Get off the bus.', jp: 'バスから降りてください。', level: 1 },
      { en: 'The cat jumped off the table.', jp: '猫はテーブルから飛び降りました。', level: 2 },
      {
        en: 'Please take your shoes off before entering.',
        jp: '入る前に靴を脱いでください。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の上へ（下→上へ移動し接触）', '〜から（起点、出所）', '〜の上の方へ（上昇）'],
    },
  },
  {
    term: 'up',
    ipa: '/ʌp/',
    jp: '〜の上の方へ（上昇）',
    examples: [
      { en: 'Go up the stairs.', jp: '階段を上がってください。', level: 1 },
      { en: 'The balloon went up into the sky.', jp: '風船は空に向かって上がりました。', level: 2 },
      { en: 'We climbed up the mountain path.', jp: '私たちは山道を登りました。', level: 3 },
    ],
    choices: {
      enToJp: ['〜の下の方へ（下降）', '〜から離れて（分離、離脱）', '〜を横切って（端から端へ）'],
    },
  },
  {
    term: 'down',
    ipa: '/daʊn/',
    jp: '〜の下の方へ（下降）',
    examples: [
      { en: 'Come down the stairs.', jp: '階段を下りて来てください。', level: 1 },
      { en: 'The ball rolled down the hill.', jp: 'ボールは坂を転がり落ちました。', level: 2 },
      { en: 'Water flows down from the mountain.', jp: '水は山から下に流れます。', level: 3 },
    ],
    choices: {
      enToJp: [
        '〜の上の方へ（上昇）',
        '〜を横切って（端から端へ）',
        '〜に沿って（線、縁に沿う移動）',
      ],
    },
  },
  {
    term: 'across',
    ipa: '/əˈkrɔːs/',
    jp: '〜を横切って（端から端へ）',
    examples: [
      { en: 'Walk across the street.', jp: '道路を横断してください。', level: 1 },
      { en: 'The bridge goes across the river.', jp: '橋は川を横切っています。', level: 2 },
      {
        en: 'We traveled across the country by train.',
        jp: '私たちは電車で国を横断しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜を通り抜けて（内部を通過）',
        '〜に沿って（線、縁に沿う移動）',
        '〜の上の方へ（上昇）',
      ],
    },
  },
  {
    term: 'through',
    ipa: '/θruː/',
    jp: '〜を通り抜けて（内部を通過）',
    examples: [
      { en: 'Walk through the park.', jp: '公園を通り抜けてください。', level: 1 },
      { en: 'The train goes through the tunnel.', jp: '電車はトンネルを通り抜けます。', level: 2 },
      {
        en: 'We looked through the window at the garden.',
        jp: '私たちは窓から庭を見ました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜を横切って（端から端へ）',
        '〜に沿って（線、縁に沿う移動）',
        '〜を通り過ぎて（通過）',
      ],
    },
  },
  {
    term: 'along',
    ipa: '/əˈlɔːŋ/',
    jp: '〜に沿って（線、縁に沿う移動）',
    examples: [
      { en: 'Walk along the river.', jp: '川に沿って歩いてください。', level: 1 },
      {
        en: 'There are many shops along this street.',
        jp: 'この通りに沿ってたくさんの店があります。',
        level: 2,
      },
      {
        en: 'We drove along the coast to enjoy the view.',
        jp: '景色を楽しむために海岸沿いをドライブしました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜を横切って（端から端へ）',
        '〜を通り抜けて（内部を通過）',
        '〜を通り過ぎて（通過）',
      ],
    },
  },
  {
    term: 'past',
    ipa: '/pæst/',
    jp: '〜を通り過ぎて（通過）',
    examples: [
      { en: 'Walk past the school.', jp: '学校を通り過ぎてください。', level: 1 },
      { en: 'The bus went past our house.', jp: 'バスは私たちの家を通り過ぎました。', level: 2 },
      {
        en: 'We drove past many beautiful towns.',
        jp: '私たちは美しい町をいくつも通り過ぎました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜に沿って（線、縁に沿う移動）',
        '〜の周りを（周回、あたりを）',
        '〜を通り抜けて（内部を通過）',
      ],
    },
  },
  {
    term: 'around',
    ipa: '/əˈraʊnd/',
    jp: '〜の周りを（周回、あたりを）',
    examples: [
      { en: 'Walk around the park.', jp: '公園の周りを歩いてください。', level: 1 },
      {
        en: 'The children ran around the playground.',
        jp: '子供たちは運動場を走り回りました。',
        level: 2,
      },
      {
        en: 'We traveled around Japan for two weeks.',
        jp: '私たちは2週間日本各地を旅行しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜を通り過ぎて（通過）',
        '〜に沿って（線、縁に沿う移動）',
        '〜の外へ、〜の外に（内→外）',
      ],
    },
  },
  {
    term: 'out of',
    ipa: '/aʊt ʌv/',
    jp: '〜の外へ、〜の外に（内→外）',
    examples: [
      { en: 'Take the book out of the bag.', jp: 'カバンから本を取り出してください。', level: 1 },
      { en: 'The cat came out of the house.', jp: '猫は家から出てきました。', level: 2 },
      {
        en: 'Students walked out of the classroom after class.',
        jp: '生徒たちは授業後に教室から出ていきました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の中へ（外→内へ進入）',
        '〜の周りを（周回、あたりを）',
        '〜から離れて（分離、離脱）',
      ],
    },
  },
];

// 時間の前置詞データ
const TIME_RAW_DATA: RawPronounItem[] = [
  // specific time points
  {
    term: 'at',
    ipa: '/æt/',
    jp: '〜に（時刻）',
    examples: [
      { en: 'I get up at 7 a.m.', jp: '私は午前7時に起きます。', level: 1 },
      { en: 'The meeting starts at 3 p.m.', jp: '会議は午後3時に始まります。', level: 2 },
      {
        en: 'We arrived at the station at noon.',
        jp: '私たちは正午に駅に到着しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜に（曜日、日付）', '〜に（年、月などの一定時間内）', '〜頃（おおよそ）'],
    },
  },
  {
    term: 'on',
    ipa: '/ɔːn/',
    jp: '〜に（曜日、日付）',
    examples: [
      { en: 'I go to school on Monday.', jp: '私は月曜日に学校に行きます。', level: 1 },
      { en: 'My birthday is on May 15th.', jp: '私の誕生日は5月15日です。', level: 2 },
      {
        en: 'We have a test on Friday morning.',
        jp: '私たちは金曜日の朝にテストがあります。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜に（時刻）', '〜に（年、月などの一定時間内）', '〜頃（おおよそ）'],
    },
  },
  {
    term: 'in',
    ipa: '/ɪn/',
    jp: '〜に（年、月などの一定時間内）',
    examples: [
      { en: 'I was born in 2010.', jp: '私は2010年に生まれました。', level: 1 },
      { en: 'School starts in April.', jp: '学校は4月に始まります。', level: 2 },
      {
        en: 'We will visit Tokyo in the summer.',
        jp: '私たちは夏に東京を訪れる予定です。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜に（時刻）', '〜に（曜日、日付）', '〜頃（おおよそ）'],
    },
  },
  {
    term: 'around',
    ipa: '/əˈraʊnd/',
    jp: '〜頃（おおよそ）',
    examples: [
      { en: 'I will be home around 6 p.m.', jp: '午後6時頃に家にいる予定です。', level: 1 },
      { en: "The movie starts around 8 o'clock.", jp: '映画は8時頃に始まります。', level: 2 },
      { en: 'We expect to finish around lunchtime.', jp: '昼食時間頃に終わる予定です。', level: 3 },
    ],
    choices: {
      enToJp: ['〜に（時刻）', '〜から（開始時点）', '〜の間（期間の長さ）'],
    },
  },
  // start / origin
  {
    term: 'from',
    ipa: '/frʌm/',
    jp: '〜から（開始時点）',
    examples: [
      { en: 'School is from 9 to 3.', jp: '学校は9時から3時までです。', level: 1 },
      {
        en: 'The store is open from Monday to Friday.',
        jp: '店は月曜日から金曜日まで開いています。',
        level: 2,
      },
      {
        en: 'I have been studying English from last year.',
        jp: '私は去年から英語を勉強しています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜から（以来ずっと継続）', '〜の間（期間の長さ）', '〜まで（継続の終点）'],
    },
  },
  {
    term: 'since',
    ipa: '/sɪns/',
    jp: '〜から（以来ずっと継続）',
    examples: [
      { en: 'I have lived here since 2020.', jp: '私は2020年からここに住んでいます。', level: 1 },
      {
        en: 'She has been my friend since elementary school.',
        jp: '彼女は小学校からの私の友だちです。',
        level: 2,
      },
      {
        en: "We haven't seen each other since last summer.",
        jp: '私たちは去年の夏以来会っていません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜から（開始時点）', '〜の間（期間の長さ）', '〜の間に（期間中に）'],
    },
  },
  // duration / extent
  {
    term: 'for',
    ipa: '/fɔːr/',
    jp: '〜の間（期間の長さ）',
    examples: [
      { en: 'I studied for two hours.', jp: '私は2時間勉強しました。', level: 1 },
      {
        en: 'We waited for the bus for 20 minutes.',
        jp: '私たちはバスを20分間待ちました。',
        level: 2,
      },
      {
        en: 'My family lived in Tokyo for five years.',
        jp: '私の家族は東京に5年間住んでいました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の間に（期間中に）', '〜から（開始時点）', '〜まで（継続の終点）'],
    },
  },
  {
    term: 'during',
    ipa: '/ˈdʊrɪŋ/',
    jp: '〜の間に（期間中に）',
    examples: [
      { en: 'I sleep during the night.', jp: '私は夜の間に眠ります。', level: 1 },
      { en: 'Please be quiet during the test.', jp: 'テスト中は静かにしてください。', level: 2 },
      {
        en: 'Many students work part-time during summer vacation.',
        jp: '多くの学生が夏休み中にアルバイトをします。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の間（期間の長さ）', '〜の間に、〜にわたって', '〜まで（継続の終点）'],
    },
  },
  {
    term: 'over',
    ipa: '/ˈoʊvər/',
    jp: '〜の間に、〜にわたって',
    examples: [
      { en: 'We talked over lunch.', jp: '私たちは昼食の間に話しました。', level: 1 },
      {
        en: 'The weather changed over the weekend.',
        jp: '週末にかけて天気が変わりました。',
        level: 2,
      },
      {
        en: 'Technology has improved over the past ten years.',
        jp: '過去10年間にわたって技術は向上しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の間（期間の長さ）', '〜の間に（期間中に）', '〜まで（継続の終点）'],
    },
  },
  {
    term: 'until',
    ipa: '/ʌnˈtɪl/',
    jp: '〜まで（継続の終点）',
    examples: [
      { en: "Wait until 3 o'clock.", jp: '3時まで待ってください。', level: 1 },
      {
        en: 'I will study until the test is over.',
        jp: 'テストが終わるまで勉強します。',
        level: 2,
      },
      {
        en: 'The library is open until 9 p.m. on weekdays.',
        jp: '図書館は平日の午後9時まで開いています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の間（期間の長さ）', '〜から（開始時点）', '〜までに（締切、最終時点）'],
    },
  },
  {
    term: 'till',
    ipa: '/tɪl/',
    jp: '〜まで（継続の終点）',
    examples: [
      { en: 'Stay here till I come back.', jp: '私が戻るまでここにいてください。', level: 1 },
      {
        en: 'The store is open till 8 p.m.',
        jp: '店は午後8時まで開いています。',
        level: 2,
      },
      {
        en: 'We waited till the rain stopped.',
        jp: '私たちは雨がやむまで待ちました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の間（期間の長さ）', '〜から（開始時点）', '〜までに（締切、最終時点）'],
    },
  },
  // before/after / immediate sequence
  {
    term: 'before',
    ipa: '/bɪˈfɔːr/',
    jp: '〜の前に（時点）',
    examples: [
      { en: 'Brush your teeth before bed.', jp: '寝る前に歯を磨いてください。', level: 1 },
      { en: 'Please arrive before 8 a.m.', jp: '午前8時前に到着してください。', level: 2 },
      {
        en: 'I always check my homework before submitting it.',
        jp: '提出する前に必ず宿題をチェックします。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の後に（時点）', '〜の直後に', '（時刻）〜過ぎ'],
    },
  },
  {
    term: 'after',
    ipa: '/ˈæftər/',
    jp: '〜の後に（時点）',
    examples: [
      { en: "Let's play after school.", jp: '放課後に遊びましょう。', level: 1 },
      { en: 'I always feel sleepy after lunch.', jp: '私は昼食後にいつも眠くなります。', level: 2 },
      {
        en: 'We can discuss this after the meeting ends.',
        jp: '会議が終わった後でこれについて話し合いましょう。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の前に（時点）', '〜の直後に', '（時刻）〜過ぎ'],
    },
  },
  {
    term: 'following',
    ipa: '/ˈfɑːloʊɪŋ/',
    jp: '〜の直後に',
    examples: [
      { en: 'Call me the following day.', jp: '翌日に電話してください。', level: 1 },
      { en: 'The following week was very busy.', jp: '翌週はとても忙しかったです。', level: 2 },
      {
        en: 'Following the announcement, students left the classroom.',
        jp: '発表の直後に、学生たちは教室を出ました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の前に（時点）', '〜の後に（時点）', '（時刻）〜過ぎ'],
    },
  },
  {
    term: 'past',
    ipa: '/pæst/',
    jp: '（時刻）〜過ぎ',
    examples: [
      { en: "It's ten past three.", jp: '3時10分過ぎです。', level: 1 },
      { en: 'The train leaves at half past six.', jp: '電車は6時半に出発します。', level: 2 },
      { en: 'Please come at quarter past eight.', jp: '8時15分に来てください。', level: 3 },
    ],
    choices: {
      enToJp: ['〜の前に（時点）', '〜の後に（時点）', '〜頃（おおよそ）'],
    },
  },
  // limits / deadlines / within-range
  {
    term: 'up to',
    ipa: '/ʌp tuː/',
    jp: '〜まで（上限）',
    examples: [
      { en: 'You can stay up to 5 p.m.', jp: '午後5時まで滞在できます。', level: 1 },
      {
        en: 'The sale lasts up to next Friday.',
        jp: 'セールは来週の金曜日まで続きます。',
        level: 2,
      },
      {
        en: 'Students can borrow up to five books at a time.',
        jp: '学生は一度に5冊まで本を借りることができます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜以内に（一定期間内）', '〜までに（締切、最終時点）', '〜まで（継続の終点）'],
    },
  },
  {
    term: 'within',
    ipa: '/wɪˈðɪn/',
    jp: '〜以内に（一定期間内）',
    examples: [
      { en: 'Please reply within three days.', jp: '3日以内に返事をください。', level: 1 },
      {
        en: 'The test results will be ready within a week.',
        jp: 'テスト結果は1週間以内に準備されます。',
        level: 2,
      },
      {
        en: 'You must submit your report within the deadline.',
        jp: '締切以内にレポートを提出しなければなりません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜まで（上限）', '〜までに（締切、最終時点）', '〜まで（継続の終点）'],
    },
  },
  {
    term: 'by',
    ipa: '/baɪ/',
    jp: '〜までに（締切、最終時点）',
    examples: [
      {
        en: 'Finish your homework by 6 p.m.',
        jp: '午後6時までに宿題を終わらせてください。',
        level: 1,
      },
      {
        en: 'Please submit the form by Friday.',
        jp: '金曜日までにフォームを提出してください。',
        level: 2,
      },
      {
        en: 'All students must arrive by 8:30 a.m.',
        jp: '全生徒は午前8時30分までに到着しなければなりません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜以内に（一定期間内）', '〜まで（上限）', '〜まで（継続の終点）'],
    },
  },
];

// 手段の前置詞データ
const MEANS_RAW_DATA: RawPronounItem[] = [
  // 関係・所属 / 部分・比率
  {
    term: 'of',
    ipa: '/ʌv/',
    jp: '〜の（所有、所属、部分など）',
    examples: [
      { en: 'This is a picture of my family.', jp: 'これは私の家族の写真です。', level: 1 },
      { en: 'The roof of the house is red.', jp: 'その家の屋根は赤いです。', level: 2 },
      {
        en: 'The results of the experiment were surprising.',
        jp: '実験の結果は驚くべきものでした。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の中の、〜のうち（比率）',
        '〜から（情報源、出所）',
        '〜によって（手段、方法、人）',
      ],
    },
  },
  {
    term: 'out of',
    ipa: '/aʊt ʌv/',
    jp: '〜の中の、〜のうち（比率）',
    examples: [
      {
        en: 'Two out of three students passed.',
        jp: '3人のうち2人の学生が合格しました。',
        level: 1,
      },
      {
        en: 'Nine out of ten people agree with this idea.',
        jp: '10人中9人がこの考えに賛成しています。',
        level: 2,
      },
      {
        en: 'Five out of every hundred cars are electric.',
        jp: '100台の車のうち5台が電気自動車です。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の（所有、所属、部分など）',
        '〜から（情報源、出所）',
        '〜を通して（媒介、経路、経験）',
      ],
    },
  },
  // 出所・経路・媒介
  {
    term: 'from',
    ipa: '/frʌm/',
    jp: '〜から（情報源、出所）',
    examples: [
      { en: 'I learned this from my teacher.', jp: '私は先生からこれを学びました。', level: 1 },
      {
        en: 'We got the news from the radio.',
        jp: '私たちはラジオからそのニュースを得ました。',
        level: 2,
      },
      {
        en: 'This information comes from a reliable source.',
        jp: 'この情報は信頼できる情報源から来ています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の（所有、所属、部分など）',
        '〜を通して（媒介、経路、経験）',
        '〜によって（手段、方法、人）',
      ],
    },
  },
  {
    term: 'through',
    ipa: '/θruː/',
    jp: '〜を通して（媒介、経路、経験）',
    examples: [
      {
        en: 'I learned English through practice.',
        jp: '私は練習を通して英語を学びました。',
        level: 1,
      },
      {
        en: 'We communicate through email.',
        jp: '私たちはメールを通してやり取りしています。',
        level: 2,
      },
      {
        en: 'Success comes through hard work and dedication.',
        jp: '成功は努力と献身を通してもたらされます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜から（情報源、出所）',
        '〜によって（手段、方法、人）',
        '〜と一緒に（道具、同伴）',
      ],
    },
  },
  {
    term: 'by',
    ipa: '/baɪ/',
    jp: '〜によって（手段、方法、人）',
    examples: [
      { en: 'I go to school by bus.', jp: '私はバスで学校に行きます。', level: 1 },
      {
        en: 'This book was written by my teacher.',
        jp: 'この本は私の先生によって書かれました。',
        level: 2,
      },
      {
        en: 'The problem was solved by using a new method.',
        jp: '問題は新しい方法を使うことによって解決されました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜を通して（媒介、経路、経験）', '〜と一緒に（道具、同伴）', '〜なしで（欠如）'],
    },
  },
  // 同伴・道具 / 欠如
  {
    term: 'with',
    ipa: '/wɪð/',
    jp: '〜と一緒に（道具、同伴）',
    examples: [
      { en: 'I eat rice with chopsticks.', jp: '私は箸でご飯を食べます。', level: 1 },
      {
        en: 'She went to the movie with her friends.',
        jp: '彼女は友だちと映画を見に行きました。',
        level: 2,
      },
      {
        en: 'The teacher explained the problem with examples.',
        jp: '先生は例を使ってその問題を説明しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜によって（手段、方法、人）',
        '〜なしで（欠如）',
        '〜のために、〜にとって（目的）',
      ],
    },
  },
  {
    term: 'without',
    ipa: '/wɪˈðaʊt/',
    jp: '〜なしで（欠如）',
    examples: [
      { en: 'I cannot live without music.', jp: '私は音楽なしでは生きられません。', level: 1 },
      {
        en: 'Please come to school without your phone.',
        jp: '携帯電話を持たずに学校に来てください。',
        level: 2,
      },
      {
        en: 'The team won the game without their best player.',
        jp: 'チームは最高の選手なしで試合に勝ちました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜と一緒に（道具、同伴）',
        '〜のために、〜にとって（目的）',
        '〜として（身分、役割、機能）',
      ],
    },
  },
  // 目的・利益
  {
    term: 'for',
    ipa: '/fɔːr/',
    jp: '〜のために、〜にとって（目的）',
    examples: [
      { en: 'This present is for you.', jp: 'このプレゼントはあなたのためのものです。', level: 1 },
      { en: 'I study hard for my future.', jp: '私は将来のために一生懸命勉強します。', level: 2 },
      {
        en: 'Regular exercise is good for your health.',
        jp: '定期的な運動は健康にとって良いです。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜なしで（欠如）', '〜として（身分、役割、機能）', '〜のように（類似、比喩）'],
    },
  },
  // 身分・役割 / 類似
  {
    term: 'as',
    ipa: '/æz/',
    jp: '〜として（身分、役割、機能）',
    examples: [
      { en: 'I work as a teacher.', jp: '私は教師として働いています。', level: 1 },
      { en: 'Use this book as a dictionary.', jp: 'この本を辞書として使ってください。', level: 2 },
      {
        en: 'He is known as the best student in our class.',
        jp: '彼は私たちのクラスで最高の生徒として知られています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜のために、〜にとって（目的）',
        '〜のように（類似、比喩）',
        '〜について（一般的な話題）',
      ],
    },
  },
  {
    term: 'like',
    ipa: '/laɪk/',
    jp: '〜のように（類似、比喩）',
    examples: [
      { en: 'She sings like a bird.', jp: '彼女は鳥のように歌います。', level: 1 },
      { en: 'He runs like the wind.', jp: '彼は風のように走ります。', level: 2 },
      {
        en: 'The new student looks like my brother.',
        jp: 'その新しい生徒は私の兄のように見えます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜として（身分、役割、機能）',
        '〜について（一般的な話題）',
        '〜について（専門的な話題）',
      ],
    },
  },
  // 話題・トピック
  {
    term: 'about',
    ipa: '/əˈbaʊt/',
    jp: '〜について（一般的な話題）',
    examples: [
      { en: 'Tell me about your school.', jp: 'あなたの学校について教えてください。', level: 1 },
      { en: 'We talked about the movie.', jp: '私たちはその映画について話しました。', level: 2 },
      {
        en: "The teacher asked questions about yesterday's lesson.",
        jp: '先生は昨日の授業について質問をしました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜のように（類似、比喻）',
        '〜について（専門的な話題）',
        '〜に反対して、〜に対して',
      ],
    },
  },
  {
    term: 'on',
    ipa: '/ɔːn/',
    jp: '〜について（専門的な話題）',
    examples: [
      { en: 'I read a book on science.', jp: '私は科学に関する本を読みました。', level: 1 },
      {
        en: 'She gave a speech on world peace.',
        jp: '彼女は世界平和についてスピーチをしました。',
        level: 2,
      },
      {
        en: 'The professor wrote a paper on modern technology.',
        jp: '教授は現代技術に関する論文を書きました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜について（一般的な話題）',
        '〜のように（類似、比喩）',
        '〜に反対して、〜に対して',
      ],
    },
  },
  // 対立・対向
  {
    term: 'against',
    ipa: '/əˈɡɛnst/',
    jp: '〜に反対して、〜に対して',
    examples: [
      { en: 'I am against this plan.', jp: '私はこの計画に反対です。', level: 1 },
      {
        en: 'Our team played against the best school.',
        jp: '私たちのチームは最高の学校と対戦しました。',
        level: 2,
      },
      {
        en: 'Many students voted against the new rule.',
        jp: '多くの生徒が新しいルールに反対票を投じました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜について（一般的な話題）',
        '〜について（専門的な話題）',
        '〜として（身分、役割、機能）',
      ],
    },
  },
];

// 論理の前置詞データ
const LOGIC_RAW_DATA: RawPronounItem[] = [
  // 比較・量の範囲
  {
    term: 'than',
    ipa: '/ðæn/',
    jp: '〜よりも（比較）',
    examples: [
      { en: 'I am taller than my sister.', jp: '私は妹より背が高いです。', level: 1 },
      {
        en: 'This book is more interesting than that one.',
        jp: 'この本はあの本より面白いです。',
        level: 2,
      },
      {
        en: "Today's test was harder than I expected.",
        jp: '今日のテストは私が思ったより難しかったです。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜以上（数値超過）', '〜を超えて（範囲外、想定外）', '〜に至るまで（数値・程度）'],
    },
  },
  {
    term: 'over',
    ipa: '/ˈoʊvər/',
    jp: '〜以上（数値超過）',
    examples: [
      {
        en: 'Students over 15 can join this club.',
        jp: '15歳以上の生徒がこのクラブに参加できます。',
        level: 1,
      },
      {
        en: 'The temperature went over 30 degrees today.',
        jp: '今日の気温は30度を超えました。',
        level: 2,
      },
      {
        en: 'Over 100 people came to the school festival.',
        jp: '100人以上の人が学校祭に来ました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜よりも（比較）', '〜を超えて（範囲外、想定外）', '〜に至るまで（数値・程度）'],
    },
  },
  {
    term: 'beyond',
    ipa: '/bɪˈjɑːnd/',
    jp: '〜を超えて（範囲外、想定外）',
    examples: [
      { en: 'This is beyond my understanding.', jp: 'これは私の理解を超えています。', level: 1 },
      {
        en: 'The mountains are beyond the river.',
        jp: '山は川の向こうにあります。',
        level: 2,
      },
      {
        en: 'His performance was beyond our expectations.',
        jp: '彼のパフォーマンスは私たちの期待を超えていました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜よりも（比較）', '〜以上（数値超過）', '〜に至るまで（数値・程度）'],
    },
  },
  {
    term: 'up to',
    ipa: '/ʌp tuː/',
    jp: '〜に至るまで（数値・程度）',
    examples: [
      {
        en: 'You can choose up to three books.',
        jp: 'あなたは最大3冊まで本を選ぶことができます。',
        level: 1,
      },
      {
        en: 'The elevator can hold up to ten people.',
        jp: 'エレベーターは最大10人まで乗ることができます。',
        level: 2,
      },
      {
        en: 'The project may take up to six months.',
        jp: 'そのプロジェクトは最大6か月かかるかもしれません。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜よりも（比較）', '〜以上（数値超過）', '〜を超えて（範囲外、想定外）'],
    },
  },
  // 価値・単位
  {
    term: 'per',
    ipa: '/pər/',
    jp: '〜につき、〜あたり（単価、率）',
    examples: [
      { en: 'The apple costs 100 yen per piece.', jp: 'りんごは1個につき100円です。', level: 1 },
      {
        en: 'Students can borrow two books per week.',
        jp: '生徒は週に2冊まで本を借りることができます。',
        level: 2,
      },
      {
        en: 'The speed limit is 60 kilometers per hour.',
        jp: '制限速度は時速60キロメートルです。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の価値がある', '〜を含めて（包含）', '〜のような（例示）'],
    },
  },
  {
    term: 'worth',
    ipa: '/wərθ/',
    jp: '〜の価値がある',
    examples: [
      { en: 'This book is worth reading.', jp: 'この本は読む価値があります。', level: 1 },
      {
        en: 'The old coin is worth a lot of money.',
        jp: 'その古いコインはたくさんのお金の価値があります。',
        level: 2,
      },
      {
        en: 'The experience was worth all the effort.',
        jp: 'その経験はすべての努力に値するものでした。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜につき、〜あたり（単価、率）', '〜を含めて（包含）', '〜のような（例示）'],
    },
  },
  // 含む・例示
  {
    term: 'including',
    ipa: '/ɪnˈkluːdɪŋ/',
    jp: '〜を含めて（包含）',
    examples: [
      { en: 'Five people came, including me.', jp: '私を含めて5人が来ました。', level: 1 },
      {
        en: 'The total cost is 1000 yen, including tax.',
        jp: '税込みで総額1000円です。',
        level: 2,
      },
      {
        en: 'Many subjects are taught here, including English.',
        jp: '英語を含む多くの科目がここで教えられています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の価値がある', '〜のような（例示）', '〜を除いて（除外）'],
    },
  },
  {
    term: 'such as',
    ipa: '/sʌtʃ æz/',
    jp: '〜のような（例示）',
    examples: [
      {
        en: 'I like fruits such as apples and oranges.',
        jp: 'りんごやオレンジのような果物が好きです。',
        level: 1,
      },
      {
        en: 'Sports such as soccer and baseball are popular.',
        jp: 'サッカーや野球のようなスポーツは人気があります。',
        level: 2,
      },
      {
        en: 'We study subjects such as math, science, and English.',
        jp: '私たちは数学、理科、英語などの科目を勉強します。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜を含めて（包含）', '〜を除いて（除外）', '〜に加えて、（否定文）〜を除いて'],
    },
  },
  // 除外・付加
  {
    term: 'except',
    ipa: '/ɪkˈsɛpt/',
    jp: '〜を除いて（除外）',
    examples: [
      { en: 'Everyone came except Tom.', jp: 'トムを除いてみんな来ました。', level: 1 },
      {
        en: 'I like all subjects except math.',
        jp: '私は数学を除いてすべての科目が好きです。',
        level: 2,
      },
      {
        en: 'The store is open every day except Sunday.',
        jp: '店は日曜日を除いて毎日開いています。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜のような（例示）', '〜に加えて、（否定文）〜を除いて', '〜の代わりに（代替）'],
    },
  },
  {
    term: 'besides',
    ipa: '/bɪˈsaɪdz/',
    jp: '〜に加えて、（否定文）〜を除いて',
    examples: [
      {
        en: 'Besides English, I study math.',
        jp: '英語に加えて、私は数学を勉強します。',
        level: 1,
      },
      {
        en: 'Besides you, no one knows the answer.',
        jp: 'あなた以外、誰もその答えを知りません。',
        level: 2,
      },
      {
        en: 'Besides being smart, she is also kind.',
        jp: '頭が良いことに加えて、彼女は親切でもあります。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜を除いて（除外）', '〜の代わりに（代替）', '〜に続いて'],
    },
  },
  // 代替
  {
    term: 'instead of',
    ipa: '/ɪnˈstɛd ʌv/',
    jp: '〜の代わりに（代替）',
    examples: [
      { en: 'I walked instead of taking the bus.', jp: 'バスに乗る代わりに歩きました。', level: 1 },
      {
        en: 'Use a pen instead of a pencil.',
        jp: '鉛筆の代わりにペンを使ってください。',
        level: 2,
      },
      {
        en: 'Instead of watching TV, I decided to read a book.',
        jp: 'テレビを見る代わりに、本を読むことにしました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜に加えて、（否定文）〜を除いて', '〜に続いて', '〜の状態に（状態変化）'],
    },
  },
  // 順序・移動
  {
    term: 'following',
    ipa: '/ˈfɑːloʊɪŋ/',
    jp: '〜に続いて',
    examples: [
      {
        en: 'Following the teacher, we entered the room.',
        jp: '先生に続いて、私たちは部屋に入りました。',
        level: 1,
      },
      {
        en: 'The meeting will be held following lunch.',
        jp: '会議は昼食の後に行われます。',
        level: 2,
      },
      {
        en: 'Following the success of the first event, we planned another.',
        jp: '最初のイベントの成功に続いて、私たちは別のイベントを計画しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜の代わりに（代替）', '〜の状態に（状態変化）', '〜から（理由、心情を起点）'],
    },
  },
  {
    term: 'into',
    ipa: '/ˈɪntuː/',
    jp: '〜の状態に（状態変化）',
    examples: [
      { en: 'The ice turned into water.', jp: '氷は水になりました。', level: 1 },
      {
        en: 'She grew into a beautiful woman.',
        jp: '彼女は美しい女性に成長しました。',
        level: 2,
      },
      {
        en: 'The small company developed into a big business.',
        jp: 'その小さな会社は大企業に発展しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: ['〜に続いて', '〜から（理由、心情を起点）', '〜が原因で、〜のために（起因）'],
    },
  },
  // 理由・起因
  {
    term: 'out of',
    ipa: '/aʊt ʌv/',
    jp: '〜から（理由、心情を起点）',
    examples: [
      { en: 'I helped him out of kindness.', jp: '私は親切心から彼を助けました。', level: 1 },
      {
        en: 'She spoke out of anger.',
        jp: '彼女は怒りから話しました。',
        level: 2,
      },
      {
        en: 'They acted out of fear for their safety.',
        jp: '彼らは安全への恐れから行動しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜の状態に（状態変化）',
        '〜が原因で、〜のために（起因）',
        '〜のおかげで（好結果の原因）',
      ],
    },
  },
  {
    term: 'because of',
    ipa: '/bɪˈkɔːz ʌv/',
    jp: '〜が原因で、〜のために（起因）',
    examples: [
      { en: 'School was closed because of snow.', jp: '雪のため学校は休校でした。', level: 1 },
      {
        en: 'I was late because of the train delay.',
        jp: '電車の遅れのため遅刻しました。',
        level: 2,
      },
      {
        en: 'The game was canceled because of bad weather.',
        jp: '悪天候のため試合は中止されました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜から（理由、心情を起点）',
        '〜のおかげで（好結果の原因）',
        '〜によれば、〜に従って',
      ],
    },
  },
  {
    term: 'thanks to',
    ipa: '/θæŋks tuː/',
    jp: '〜のおかげで（好結果の原因）',
    examples: [
      {
        en: 'Thanks to my teacher, I passed the test.',
        jp: '先生のおかげでテストに合格しました。',
        level: 1,
      },
      {
        en: 'Thanks to the good weather, we had a great picnic.',
        jp: '良い天気のおかげで、素晴らしいピクニックができました。',
        level: 2,
      },
      {
        en: "Thanks to everyone's help, the project was successful.",
        jp: 'みなさんの助けのおかげで、プロジェクトは成功しました。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜から（理由、心情を起点）',
        '〜が原因で、〜のために（起因）',
        '〜によれば、〜に従って',
      ],
    },
  },
  // 参照・譲歩
  {
    term: 'according to',
    ipa: '/əˈkɔːrdɪŋ tuː/',
    jp: '〜によれば、〜に従って',
    examples: [
      {
        en: 'According to the teacher, the test is tomorrow.',
        jp: '先生によれば、テストは明日です。',
        level: 1,
      },
      {
        en: 'According to the weather report, it will rain.',
        jp: '天気予報によれば、雨が降るでしょう。',
        level: 2,
      },
      {
        en: 'According to the survey, most students like math.',
        jp: '調査によれば、ほとんどの生徒が数学を好んでいます。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜のおかげで（好結果の原因）',
        '〜にもかかわらず（譲歩）',
        '〜が原因で、〜のために（起因）',
      ],
    },
  },
  {
    term: 'in spite of',
    ipa: '/ɪn spaɪt ʌv/',
    jp: '〜にもかかわらず（譲歩）',
    examples: [
      {
        en: 'In spite of the rain, we went out.',
        jp: '雨にもかかわらず、私たちは外出しました。',
        level: 1,
      },
      {
        en: 'In spite of being tired, she kept studying.',
        jp: '疲れていたにもかかわらず、彼女は勉強し続けました。',
        level: 2,
      },
      {
        en: 'In spite of the difficulties, the team never gave up.',
        jp: '困難にもかかわらず、チームは諦めませんでした。',
        level: 3,
      },
    ],
    choices: {
      enToJp: [
        '〜によれば、〜に従って',
        '〜のおかげで（好結果の原因）',
        '〜が原因で、〜のために（起因）',
      ],
    },
  },
];

export const PREPOSITION_DATA_BASE: EnglishWordGroupBase[] = [
  {
    id: 'position',
    groupNo: 1,
    title: '位置',
    abbr: '位置',
    icon: MapPin,
    items: withIndex(POSITION_RAW_DATA),
  },
  {
    id: 'direction',
    groupNo: 2,
    title: '方向',
    abbr: '方向',
    icon: Navigation,
    items: withIndex(DIRECTION_RAW_DATA),
  },
  {
    id: 'time',
    groupNo: 3,
    title: '時間',
    abbr: '時間',
    icon: Clock,
    items: withIndex(TIME_RAW_DATA),
  },
  {
    id: 'means',
    groupNo: 4,
    title: '手段',
    abbr: '手段',
    icon: Hand,
    items: withIndex(MEANS_RAW_DATA),
  },
  {
    id: 'logic',
    groupNo: 5,
    title: '論理',
    abbr: '論理',
    icon: Lightbulb,
    items: withIndex(LOGIC_RAW_DATA),
  },
];
