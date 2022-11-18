import { normalizeApiData } from '../redux/utils';
import { IApiResPost } from '../types/post';

export const auth = {
  client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
  email: 'sdfsd@sdf.sd',
  sl_token: 'smslt_4a4b96950a6843_3b663567aa2c0b',
};

export const posts = [
  {
    id: 'post6375f7bd9c794_e41690b2',
    from_name: 'Ethelene Maggi',
    from_id: 'user_18',
    message:
      'trench terminal prevent empire contrast border feminine haircut mold friend reptile feminine think mess member threshold ministry absent crusade due section rain troop aluminium freedom save insert disk AIDS thaw abortion attention photocopy core reduction elephant size swipe seed dare return rally cage pump role lawyer bike spray bathroom coin linen eject album spray belief bike pit omission permission chest crash safety instal blue jean audience planet',
    type: 'status',
    created_time: '2022-11-17T04:52:28+00:00',
  },
  {
    id: 'post6375f7bd9c7ab_6887ecee',
    from_name: 'Ethelene Maggi',
    from_id: 'user_18',
    message:
      'opposite recovery ankle hour indication accountant depend haircut prescription cover abstract extend chain project habitat snub oak dog spot tune leader tile lost penny race painter check berry district speech norm pump leak trail toss traction charm knock loud wisecrack surround mother',
    type: 'status',
    created_time: '2022-11-16T23:05:13+00:00',
  },
  {
    id: 'post6375f7bd9c7ba_22017b7c',
    from_name: 'Britany Heise',
    from_id: 'user_4',
    message:
      'fountain reliance omission hour prisoner opposite flu fund possibility view mold abundant freedom stake pain acquisition far greeting area thin pedestrian damage stain suffer restrict leaflet debut assessment retain lost drop plant rider humanity day wrist discourage stand correspondence convince lip glow adventure clearance marsh crossing describe album surround reveal innocent era building broken promotion stimulation day plain reinforce bake cope charm treasurer marriage wreck broadcast rally psychology mood clock business',
    type: 'status',
    created_time: '2022-11-16T11:01:19+00:00',
  },
  {
    id: 'post6375f7bd9c7c4_12179a89',
    from_name: 'Carly Alvarez',
    from_id: 'user_6',
    message:
      'say bike spell forest bracket speech skin confusion duck clearance biology conception serve anger grow abortion leak rehearsal spend landowner axis location donor blue jean evening hell achievement survivor carve shaft business nest broken arch celebration sex drill rocket disability facade think need',
    type: 'status',
    created_time: '2022-11-16T05:46:54+00:00',
  },
  {
    id: 'post6375f7bd9c7b4_bccd8355',
    from_name: 'Carson Smithson',
    from_id: 'user_5',
    message: 'lie admiration swallow warrant guideline stable invisible solo',
    type: 'status',
    created_time: '2022-11-16T17:39:39+00:00',
  },
  {
    id: 'post6375f7bd9c7b7_98607fdb',
    from_name: 'Carson Smithson',
    from_id: 'user_5',
    message: 'mug speculate animal bake improve core rear market wreck heal date',
    type: 'status',
    created_time: '2022-11-16T14:27:56+00:00',
  },
];

export const normalizedData = normalizeApiData(posts as []);
