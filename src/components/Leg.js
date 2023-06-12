import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Highcharts from 'highcharts';
import HighchartsReact from "highcharts-react-official";
import ItemSeries from 'highcharts/modules/item-series';
ItemSeries(Highcharts);
import { MapContainer, Polygon, Tooltip, Popup, TileLayer, Pane } from "react-leaflet";

import data from "../map.json";

export default function Leg(){

    const [firstRoundDisplay, setFirstRoundDisplay] = useState([]);
    const [matrixReport, setMatrixReport] = useState([]);
    const [uncertaintyDisplay, setUncertaintyDisplay] = useState([]);
    const [resultDisplay, setResultDisplay] = useState([]);
    const [chartDisplay, setChartDisplay] = useState([]);
    const [tableDisplay, setTableDisplay] = useState([]);
    const [dualsDisplay, setDualsDisplay] = useState([]);
    const [mapDisplay, setMapDisplay] = useState([]);

    let duals = [
        ["NUPES", 0, 0, 0],
        ["ENSEMBLE", 0, 0, 0],
        ["LR", 0, 0, 0],
        ["RN", 0, 0, 0]
    ];

    const [parties, setParties] = useState([
        ["NUPES", 25.66, "#E81502", 0, 0, 0, 25.66],
        ["ENSEMBLE", 25.75, '#FFCC00', 0, 0, 0, 25.75],
        ["LR-UDI", 11.29, '#3399FF', 0, 0, 0, 11.29],
        ["RN", 18.68, "#723E64", 0, 0, 0, 18.68]
    ]);
    let circos = [
        ["1re de l'Ain", 9982, 8071, 10599, 1995, 8971, "01001"],
        ["2e de l'Ain", 12428, 12916, 7192, 2392, 11354],
        ["3e de l'Ain", 7990, 10704, 6425, 1835, 4993],
        ["4e de l'Ain", 7786, 7317, 7198, 2506, 11116],
        ["5e de l'Ain", 8485, 12034, 3580, 2073, 7110],
        ["1re de l'Aisne", 6463, 7939, 3853, 1312, 11245],
        ["2e de l'Aisne", 5757, 3755, 11704, 938, 9331],
        ["3e de l'Aisne", 13518, 0, 3584, 1617, 9518],
        ["4e de l'Aisne", 7461, 7632, 4300, 810, 11973],
        ["5e de l'Aisne", 7265, 6214, 1873, 1400, 13572],
        ["1re de l'Allier", 13578, 8634, 5476, 2326, 8615],
        ["2e de l'Allier", 8719, 6796, 4468, 1557, 7642],
        ["3e de l'Allier", 7737, 9219, 9594, 1580, 8047],
        ["1re des Alpes-de-Haute-Provence", 8744, 7008, 544, 1728, 8910],
        ["2e des Alpes-de-Haute-Provence", 9940, 10232, 1288, 1433, 7905],
        ["1re des Hautes-Alpes", 8562, 7542, 3803, 1116, 6552],
        ["2e des Hautes-Alpes", 8365, 10889, 1549, 883, 4996],
        ["1re des Alpes-Maritimes", 7260, 9215, 11271, 0, 4729],
        ["2e des Alpes-Maritimes", 7591, 9547, 5686, 2930, 9639],
        ["3e des Alpes-Maritimes", 8524, 10113, 4973, 4217, 6668],
        ["4e des Alpes-Maritimes", 5803, 8464, 5494, 4036, 10925],
        ["5e des Alpes-Maritimes", 7052, 10400, 8943, 2843, 7560],
        ["6e des Alpes-Maritimes", 4910, 8489, 7450, 3590, 9340],
        ["7e des Alpes-Maritimes", 7086, 10814, 12031, 3472, 7675],
        ["8e des Alpes-Maritimes", 4506, 7080, 12144, 3481, 6766],
        ["9e des Alpes-Maritimes", 5395, 5538, 10605, 2712, 7518],
        ["1re de l'Ardèche", 15107, 6757, 4081, 1494, 9202],
        ["2e de l'Ardèche", 11785, 15014, 8941, 1767, 9512],
        ["3e de l'Ardèche", 11989, 5913, 11217, 1268, 6964],
        ["1re des Ardennes", 5960, 6602, 6338, 1438, 8835],
        ["2e des Ardennes", 4970, 3309, 10685, 682, 5485],
        ["3e des Ardennes", 3822, 2235, 12332, 923, 5758],
        ["1re de l'Ariège", 10347, 6237, 0, 1134, 6229],
        ["2e de l'Ariège", 9424, 4237, 783, 1271, 6686],
        ["1re de l'Aube", 4558, 7615, 5093, 1106, 11406],
        ["2e de l'Aube", 6164, 6130, 10425, 1695, 9990],
        ["3e de l'Aube", 6430, 6546, 4507, 1318, 8958],
        ["1re de l'Aude", 13620, 10636, 2501, 2291, 15871],
        ["2e de l'Aude", 9204, 9666, 3706, 2015, 12365],
        ["3e de l'Aude", 12547, 10624, 1573, 2282, 13838],
        ["1re de l'Aveyron", 8922, 17580, 5436, 1409, 5391],
        ["2e de l'Aveyron", 10534, 8568, 5907, 1208, 4865],
        ["3e de l'Aveyron", 10493, 9741, 6818, 1300, 6017],
        ["1re des Bouches-du-Rhône", 8092, 8487, 2230, 2790, 9103],
        ["2e des Bouches-du-Rhône", 10101, 12026, 5262, 3480, 6561],
        ["3e des Bouches-du-Rhône", 7678, 6056, 995, 4215, 7016],
        ["4e des Bouches-du-Rhône", 13871, 3683, 1176, 910, 2396],
        ["5e des Bouches-du-Rhône", 13496, 7841, 1346, 2159, 5131],
        ["6e des Bouches-du-Rhône", 7179, 9725, 2744, 2321, 7810],
        ["7e des Bouches-du-Rhône", 6904, 2879, 294, 897, 4226],
        ["8e des Bouches-du-Rhône", 9197, 13166, 7074, 2638, 12004],
        ["9e des Bouches-du-Rhône", 9776, 9306, 7061, 2828, 11256],
        ["10e des Bouches-du-Rhône", 11271, 10739, 7016, 3413, 15165],
        ["11e des Bouches-du-Rhône", 9362, 10598, 4399, 2963, 9679],
        ["12e des Bouches-du-Rhône", 7339, 0, 11429, 2351, 13921],
        ["13e des Bouches-du-Rhône", 14361, 6180, 1205, 1953, 12430],
        ["14e des Bouches-du-Rhône", 12256, 14250, 5741, 2975, 7961],
        ["15e des Bouches-du-Rhône", 9715, 11458, 7456, 3201, 15269],
        ["16e des Bouches-du-Rhône", 10673, 9970, 0, 2746, 12324],
        ["1re du Calvados", 13622, 11507, 5275, 1105, 4048],
        ["2e du Calvados", 14040, 8138, 2449, 886, 5091],
        ["3e du Calvados", 8160, 8531, 8311, 1355, 9229],
        ["4e du Calvados", 11865, 19101, 6583, 2221, 9849],
        ["5e du Calvados", 11255, 13514, 8733, 1572, 9240],
        ["6e du Calvados", 11786, 16491, 3473, 1342, 10447],
        ["1re du Cantal", 6104, 7338, 13299, 1013, 3695],
        ["2e du Cantal", 4534, 4848, 10472, 796, 3861],
        ["1re de la Charente", 11152, 12336, 2122, 1731, 6503],
        ["2e de la Charente", 8244, 11568, 4920, 1521, 9245],
        ["3e de la Charente", 8851, 9286, 1914, 1284, 10475],
        ["1re de la Charente-Maritime", 12875, 12656, 1009, 2114, 5253],
        ["2e de la Charente-Maritime", 14928, 15246, 6680, 1837, 11049],
        ["3e de la Charente-Maritime", 8685, 10111, 2826, 1680, 9192],
        ["4e de la Charente-Maritime", 9114, 12743, 6828, 1935, 11900],
        ["5e de la Charente-Maritime", 11886, 14245, 10519, 2474, 15404],
        ["1re du Cher", 8370, 11113, 4669, 1660, 7591],
        ["2e du Cher", 10300, 7193, 3912, 1088, 7317],
        ["3e du Cher", 8901, 13299, 3171, 1717, 11226],
        ["1re de la Corrèze", 13271, 10095, 10772, 1603, 7905],
        ["2e de la Corrèze", 10239, 9947, 11262, 1603, 8490],
        ["1re de Côte-d'Or", 9558, 11622, 5521, 1599, 4558],
        ["2e de Côte-d'Or", 10116, 9347, 3952, 1662, 7151],
        ["3e de Côte-d'Or", 8610, 8701, 2853, 1419, 7704], 
        ["4e de Côte-d'Or", 6448, 5869, 6660, 1736, 7733],
        ["5e de Côte-d'Or", 8299, 11326, 5620, 1843, 10005],
        ["1re des Côtes-d'Armor", 13092, 11817, 3047, 1215, 5904],
        ["2e des Côtes-d'Armor", 14659, 20946, 5907, 1928, 9340],
        ["3e des Côtes-d'Armor", 10980, 9049, 20203, 788, 5693],
        ["4e des Côtes-d'Armor", 11852, 11296, 2964, 1189, 7027],
        ["5e des Côtes-d'Armor", 15851, 18543, 4038, 1965, 7999],
        ["1re de la Creuse", 12545, 12368, 8383, 1115, 8118],
        ["1re de la Dordogne", 9845, 8692, 4915, 1572, 8209],
        ["2e de la Dordogne", 9214, 9591, 2961, 2149, 10338],
        ["3e de la Dordogne", 8937, 8796, 2160, 1358, 8477],
        ["4e de la Dordogne", 12787, 9958, 6102, 1511, 8624],
        ["1re du Doubs", 11022, 9901, 4070, 1608, 6597],
        ["2e du Doubs", 13112, 12647, 4354, 1472, 7055],
        ["3e du Doubs", 6202, 6919, 2506, 1091, 7819],
        ["4e du Doubs", 5791, 7878, 3098, 1232, 8738],
        ["5e du Doubs", 7516, 7825, 16893, 1118, 5869],
        ["1re de la Drôme", 10058, 7353, 6996, 1644, 5638],
        ["2e de la Drôme", 10398, 8731, 5561, 2409, 11585],
        ["3e de la Drôme", 22321, 14782, 9986, 2147, 10001],
        ["4e de la Drôme", 14858, 7791, 12579, 1864, 9801],
        ["1re de l'Eure", 7609, 10583, 3219, 1736, 11830],
        ["2e de l'Eure", 8171, 9994, 3945, 1394, 11508],
        ["3e de l'Eure", 8124, 9848, 6937, 1410, 13473],
        ["4e de l'Eure", 12078, 10728, 3104, 1533, 12598],
        ["5e de l'Eure", 8958, 11912, 3496, 2286, 12555],
        ["1re d'Eure-et-Loir", 10087, 13838, 3892, 2083, 8270],
        ["2e d'Eure-et-Loir", 5998, 5271, 9124, 966, 7880],
        ["3e d'Eure-et-Loir", 6283, 9505, 2934, 1134, 8086],
        ["4e d'Eure-et-Loir", 5079, 14050, 2468, 1679, 8072],
        ["1re du Finistère", 15760, 17432, 3615, 1782, 5339],
        ["2e du Finistère", 12135, 5936, 1356, 1484, 3815],
        ["3e du Finistère", 13711, 19442, 2997, 1507, 5989],
        ["4e du Finistère", 13625, 15295, 5078, 1054, 5181],
        ["5e du Finistère", 14444, 15555, 8484, 1329, 6591],
        ["6e du Finistère", 15345, 16526, 5218, 1387, 7146],
        ["7e du Finistère", 13443, 14001, 5416, 1292, 5589],
        ["8e du Finistère", 14772, 16270, 3104, 1678, 7522],
        ["1re du Gard", 8731, 9200, 2125, 2269, 11546],
        ["2e du Gard", 9502, 10050, 3802, 2241, 15434],
        ["3e du Gard", 9474, 12274, 3087, 3043, 13796],
        ["4e du Gard", 11870, 9637, 1400, 2046, 13648],
        ["5e du Gard", 16451, 10399, 3834, 1918, 11582],
        ["6e du Gard", 9582, 9107, 3438, 2779, 9018],
        ["1re de Haute-Garonne", 17468, 12314, 1637, 2065, 4279],
        ["2e de Haute-Garonne", 20570, 14807, 3174, 2397, 7245],
        ["3e de Haute-Garonne", 14695, 13614, 7488, 2281, 4080],
        ["4e de Haute-Garonne", 16321, 8273, 3084, 1447, 2512],
        ["5e de Haute-Garonne", 14615, 15174, 1743, 2260, 12931],
        ["6e de Haute-Garonne", 17904, 18437, 2658, 2081, 10231],
        ["7e de Haute-Garonne", 16149, 13968, 1650, 2459, 12531],
        ["8e de Haute-Garonne", 12920, 9281, 1375, 1782, 9843],
        ["9e de Haute-Garonne", 16167, 10265, 1954, 1869, 5781],
        ["10e de Haute-Garonne", 19535, 17720, 3088, 2289, 8947],
        ["1re du Gers", 10219, 12648, 0, 1971, 8202],
        ["2e du Gers", 7122, 7888, 4873, 1830, 6976],
        ["1re de Gironde", 14006, 19604, 4116, 2866, 4929],
        ["2e de Gironde", 17054, 12407, 2799, 1879, 1970],
        ["3e de Gironde", 19730, 12947, 1335, 1248, 4748],
        ["4e de Gironde", 17628, 10431, 1561, 1679, 9191],
        ["5e de Gironde", 15134, 14876, 2485, 2257, 16672],
        ["6e de Gironde", 18765, 19258, 2815, 2174, 8222],
        ["7e de Gironde", 14513, 15252, 2864, 1455, 4914],
        ["8e de Gironde", 11269, 20943, 5964, 3420, 11798],
        ["9e de Gironde", 12415, 14732, 2802, 2136, 12008],
        ["10e de Gironde", 9705, 13565, 0, 2582, 11628],
        ["11e de Gironde", 10768, 11230, 940, 1127, 18662],
        ["12e de Gironde", 12455, 11366, 2101, 1908, 9375],
        ["1re de l'Hérault", 10943, 10087, 1466, 2523, 8360],
        ["2e de l'Hérault", 11513, 5282, 476, 1195, 2490],
        ["3e de l'Hérault", 12416, 12457, 2603, 2568, 8080],
        ["4e de l'Hérault", 16841, 12527, 1724, 3085, 13633],
        ["5e de l'Hérault", 11932, 8378, 1364, 2091, 13806],
        ["6e de l'Hérault", 7131, 6530, 936, 3418, 19136],
        ["7e de l'Hérault", 11278, 10031, 5328, 2982, 16076],
        ["8e de l'Hérault", 12634, 10453, 1570, 2231, 10729],
        ["9e de l'Hérault", 11033, 11307, 2267, 2361, 10058],
        ["1re d'Ille-et-Vilaine", 19220, 15992, 1902, 1184, 4679],
        ["2e d'Ille-et-Vilaine", 21596, 22630, 0, 2204, 4598],
        ["3e d'Ille-et-Vilaine", 16822, 15317, 4015, 1350, 6998],
        ["4e d'Ille-et-Vilaine", 15371, 14035, 3715, 1265, 8245],
        ["5e d'Ille-et-Vilaine", 14069, 18595, 9067, 1469, 7248],
        ["6e d'Ille-et-Vilaine", 11762, 21513, 1825, 966, 7618],
        ["7e d'Ille-et-Vilaine", 11486, 15330, 13736, 1970, 6961],
        ["8e d'Ille-et-Vilaine", 22610, 15950, 1088, 1412, 3399],
        ["1re de l'Indre", 8313, 10152, 6705, 1544, 8224],
        ["2e de l'Indre", 9815, 8192, 11386, 1593, 10544],
        ["1re d'Indre-et-Loire", 13803, 9545, 4129, 1525, 3251],
        ["2e d'Indre-et-Loire", 12102, 15187, 3640, 2044, 10279],
        ["3e d'Indre-et-Loire", 12127, 12686, 10448, 1392, 9836],
        ["4e d'Indre-et-Loire", 13461, 13666, 4349, 1907, 9043],
        ["5e d'Indre-et-Loire", 8339, 12543, 5788, 2191, 9069],
        ["1re de l'Isère", 17785, 19543, 3217, 2326, 3407],
        ["2e de l'Isère", 12003, 10188, 1732, 1452, 6474],
        ["3e de l'Isère", 12284, 7112, 2049, 975, 3424],
        ["4e de l'Isère", 19437, 10697, 3391, 1922, 7618],
        ["5e de l'Isère", 17457, 16651, 0, 2647, 9909],
        ["6e de l'Isère", 8740, 10561, 5424, 2201, 12100],
        ["7e de l'Isère", 9694, 9155, 11492, 1879, 10935],
        ["8e de l'Isère", 8995, 9113, 8213, 1663, 9007],
        ["9e de l'Isère", 15271, 14981, 6135, 1789, 9626],
        ["10e de l'Isère", 10485, 11347, 3861, 2007, 11817],
        ["1re du Jura", 9467, 12247, 2556, 1203, 7300],
        ["2e du Jura", 6651, 5047, 8146, 709, 4628],
        ["3e du Jura", 8865, 5349, 9144, 1162, 8264],
        ["1re des Landes", 12805, 18633, 3516, 2196, 11241],
        ["2e des Landes", 18992, 21213, 3013, 2580, 10116],
        ["3e des Landes", 22057, 13656, 2849, 1780, 10317],
        ["1re du Loir-et-Cher", 9873, 12985, 3015, 1828, 9073],
        ["2e du Loir-et-Cher", 6703, 8009, 6824, 5523, 9493],
        ["3e du Loir-et-Cher", 8144, 10357, 9161, 1508, 10141],
        ["1re de la Loire", 6487, 6746, 1288, 1400, 5203],
        ["2e de la Loire", 7738, 6161, 1938, 1145, 3454],
        ["3e de la Loire", 8858, 9621, 5060, 2067, 7890],
        ["4e de la Loire", 11501, 8224, 12601, 1930, 10555],
        ["5e de la Loire", 10292, 11842, 13031, 2058, 9623],
        ["6e de la Loire", 10482, 14590, 14001, 2240, 11527],
        ["1re de Haute-Loire", 9933, 7459, 23940, 1375, 7507],
        ["2e de Haute-Loire", 8166, 4764, 18850, 1040, 5618],
        ["1re de Loire-Atlantique", 15343, 13067, 5212, 1984, 2652],
        ["2e de Loire-Atlantique", 23524, 14350, 4717, 2077, 2520],
        ["3e de Loire-Atlantique", 19990, 13662, 2686, 1523, 4622],
        ["4e de Loire-Atlantique", 20291, 13908, 2737, 1180, 4838],
        ["5e de Loire-Atlantique", 21173, 24235, 2741, 2394, 7475],
        ["6e de Loire-Atlantique", 17755, 13649, 5179, 1912, 9324],
        ["7e de Loire-Atlantique", 14147, 13108, 7712, 3008, 9309],
        ["8e de Loire-Atlantique", 13432, 11341, 1901, 1059, 6443],
        ["9e de Loire-Atlantique", 18384, 16449, 3792, 2067, 11358],
        ["10e de Loire-Atlantique", 18699, 19638, 9377, 1979, 7011],
        ["1re du Loiret", 10989, 13988, 4621, 1689, 5842],
        ["2e du Loiret", 10338, 11978, 4811, 2043, 7911],
        ["3e du Loiret", 6814, 7420, 4502, 1235, 10931],
        ["4e du Loiret", 6789, 6600, 5008, 1166, 10986],
        ["5e du Loiret", 6594, 7597, 6520, 1330, 9741],
        ["6e du Loiret", 9339, 11851, 3542, 1283, 7152],
        ["1re du Lot", 9474, 7118, 19352, 1105, 3844],
        ["2e du Lot", 9116, 9103, 3119, 1224, 4735],
        ["1re du Lot-et-Garonne", 11772, 13309, 2542, 2220, 12515],
        ["2e du Lot-et-Garonne", 10423, 10259, 2339, 2018, 12233],
        ["3e du Lot-et-Garonne", 8871, 7802, 5361, 2266, 9664],
        ["1re de la Lozère", 8637, 5996, 6371, 1137, 3704],
        ["1re du Maine-et-Loire", 13163, 15381, 4508, 1631, 5483],
        ["2e du Maine-et-Loire", 13659, 18538, 2833, 1647, 5735],
        ["3e du Maine-et-Loire", 7803, 7290, 8328, 983, 7411],
        ["4e du Maine-et-Loire", 8544, 14298, 2598, 1887, 7307],
        ["5e du Maine-et-Loire", 8039, 11073, 6472, 1025, 4588],
        ["6e du Maine-et-Loire", 12596, 14073, 1894, 1335, 7229],
        ["7e du Maine-et-Loire", 12137, 16333, 976, 1655, 6040],
        ["1re de la Manche", 8265, 7421, 16786, 850, 7045],
        ["2e de la Manche", 8949, 20620, 3860, 1648, 8700],
        ["3e de la Manche", 13088, 18678, 7992, 1677, 10274],
        ["4e de la Manche", 13280, 12664, 923, 1279, 7120],
        ["1re de la Marne", 7737, 9120, 4975, 1389, 6485],
        ["2e de la Marne", 7369, 6964, 3565, 1603, 7213],
        ["3e de la Marne", 6302, 10841, 3169, 1601, 10215],
        ["4e de la Marne", 6411, 11329, 3461, 950, 9533],
        ["5e de la Marne", 4066, 3268, 16329, 1293, 9989],
        ["1re de Haute-Marne", 5622, 7342, 4660, 964, 9479],
        ["2e de Haute-Marne", 3438, 3122, 7686, 663, 10928],
        ["1re de la Mayenne", 17684, 8415, 2317, 1430, 4744],
        ["2e de la Mayenne", 8834, 10019, 2804, 1317, 5966],
        ["3e de la Mayenne", 6491, 19187, 0, 1160, 5335],
        ["1re de Meurthe-et-Moselle", 12822, 13159, 2995, 1744, 5669],
        ["2e de Meurthe-et-Moselle", 12101, 10448, 2753, 1457, 4427],
        ["3e de Meurthe-et-Moselle", 7345, 7429, 1814, 1255, 7061],
        ["4e de Meurthe-et-Moselle", 8727, 7170, 14239, 1329, 11825],
        ["5e de Meurthe-et-Moselle", 16393, 5268, 1735, 1345, 10216],
        ["6e de Meurthe-et-Moselle", 11048, 6705, 3570, 1149, 10501],
        ["1re de la Meuse", 6272, 4795, 10826, 1277, 10913],
        ["2e de la Meuse", 4318, 5101, 3588, 676, 8693],
        ["1re du Morbihan", 15432, 21004, 5009, 2954, 7145],
        ["2e du Morbihan", 14667, 19426, 3009, 2390, 9054],
        ["3e du Morbihan", 10744, 13902, 8113, 1414, 8938],
        ["4e du Morbihan", 0, 0, 0, 0, 0],
        ["5e du Morbihan", 12916, 9423, 8785, 1890, 5307],
        ["6e du Morbihan", 12335, 16452, 1724, 1252, 10213],
        ["1re de la Moselle", 8714, 8983, 4022, 1580, 9385],
        ["2e de la Moselle", 7188, 8005, 4852, 1350, 6871],
        ["3e de la Moselle", 8178, 5012, 4540, 1375, 6192],
        ["4e de la Moselle", 4912, 4973, 17014, 1158, 7853],
        ["5e de la Moselle", 4216, 6802, 7108, 1354, 7498],
        ["6e de la Moselle", 4009, 5122, 2263, 1085, 7077],
        ["7e de la Moselle", 7013, 7851, 5671, 1818, 12018],
        ["8e de la Moselle", 8750, 7455, 1120, 1159, 11167],
        ["9e de la Moselle", 9126, 13406, 2798, 1336, 8918],
        ["1re de la Nièvre", 8863, 11287, 1770, 1071, 9205],
        ["2e de la Nièvre", 9981, 10982, 4444, 1697, 11416],
        ["1re du Nord", 15000, 6071, 1984, 782, 2960],
        ["2e du Nord", 17212, 9823, 3106, 1344, 5328],
        ["3e du Nord", 6807, 5455, 4246, 1014, 11323],
        ["4e du Nord", 13440, 14658, 3051, 1849, 6785],
        ["5e du Nord", 12213, 12012, 8562, 1196, 12211],
        ["6e du Nord", 9679, 16307, 6876, 1682, 9614],
        ["7e du Nord", 8483, 8596, 5758, 1311, 5141],
        ["8e du Nord", 8684, 5267, 1264, 692, 4346],
        ["9e du Nord", 11841, 13889, 8897, 1904, 4190],
        ["10e du Nord", 7059, 11950, 934, 1035, 6709],
        ["11e du Nord", 15178, 10953, 3765, 1438, 7355],
        ["12e du Nord", 7945, 11055, 3268, 1543, 13727],
        ["13e du Nord", 8394, 11317, 1390, 1056, 10506],
        ["14e du Nord", 7861, 15582, 4931, 1802, 13032],
        ["15e du Nord", 9200, 8084, 4910, 1155, 12133],
        ["16e du Nord", 11632, 5245, 1838, 990, 12416],
        ["17e du Nord", 7250, 7636, 1688, 966, 10414],
        ["18e du Nord", 6207, 4980, 8835, 1329, 12074],
        ["19e du Nord", 8532, 5839, 1106, 813, 14758],
        ["20e du Nord", 10819, 4654, 525, 1011, 10334],
        ["21e du Nord", 7798, 0, 11769, 1089, 9508],
        ["1re de l'Oise", 7281, 5019, 12692, 988, 10780],
        ["2e de l'Oise", 6536, 8900, 3545, 1260, 14440],
        ["3e de l'Oise", 7885, 6415, 3184, 1100, 9031],
        ["4e de l'Oise", 7883, 12044, 5950, 2713, 10772],
        ["5e de l'Oise", 7298, 6860, 7935, 1677, 8362],
        ["6e de l'Oise", 6475, 7875, 5133, 1658, 10322],
        ["7e de l'Oise", 9275, 4845, 9191, 1154, 8745],
        ["1re de l'Orne", 8448, 7572, 6231, 1241, 6723],
        ["2e de l'Orne", 5318, 4562, 10759, 1287, 8067],
        ["3e de l'Orne", 6090, 4787, 13050, 894, 6135],
        ["1re du Pas-de-Calais", 7579, 12396, 6446, 1888, 18153],
        ["2e du Pas-de-Calais", 9660, 12234, 4004, 1365, 10604],
        ["3e du Pas-de-Calais", 12101, 4379, 568, 826, 13050],
        ["4e du Pas-de-Calais", 7683, 13168, 8782, 1491, 10378],
        ["5e du Pas-de-Calais", 7179, 9923, 1461, 1173, 10691],
        ["6e du Pas-de-Calais", 7309, 14667, 4500, 1484, 13857],
        ["7e du Pas-de-Calais", 7468, 6063, 10570, 871, 11313],
        ["8e du Pas-de-Calais", 16922, 9440, 2235, 1037, 12140],
        ["9e du Pas-de-Calais", 6021, 8626, 3622, 1032, 11596],
        ["10e du Pas-de-Calais", 6587, 6945, 903, 898, 18230],
        ["11e du Pas-de-Calais", 9214, 4846, 1382, 0, 21219],
        ["12e du Pas-de-Calais", 11703, 5927, 766, 1076, 16609],
        ["1re du Puy-de-Dôme", 13211, 10465, 4320, 1235, 5617],
        ["2e du Puy-de-Dôme", 20055, 9017, 7332, 1172, 7862],
        ["3e du Puy-de-Dôme", 14363, 13525, 6839, 1580, 5759],
        ["4e du Puy-de-Dôme", 15519, 12870, 8158, 1296, 8379],
        ["5e du Puy-de-Dôme", 25686, 9156, 4172, 1328, 9964],
        ["1re des Pyrénées-Atlantiques", 11318, 11243, 2709, 1433, 4991],
        ["2e des Pyrénées-Atlantiques", 11040, 14826, 0, 2887, 7128],
        ["3e des Pyrénées-Atlantiques", 9211, 16345, 7342, 1497, 6847],
        ["4e des Pyrénées-Atlantiques", 10395, 11508, 0, 1526, 5015],
        ["5e des Pyrénées-Atlantiques", 12323, 16657, 0, 2725, 6795],
        ["6e des Pyrénées-Atlantiques", 10302, 15023, 2618, 2191, 5209],
        ["1re des Hautes-Pyrénées", 11539, 11028, 2344, 1684, 7378],
        ["2e des Hautes-Pyrénées", 10504, 10870, 2770, 1667, 8483],
        ["1re des Pyrénées-Orientales", 7659, 7952, 1799, 1811, 10162],
        ["2e des Pyrénées-Orientales", 9601, 9700, 4182, 2717, 17812],
        ["3e des Pyrénées-Orientales", 11091, 9902, 2359, 1963, 11247],
        ["4e des Pyrénées-Orientales", 10294, 10799, 2396, 2730, 15056],
        ["1re du Bas-Rhin", 11976, 9085, 1479, 1111, 2061],
        ["2e du Bas-Rhin", 12785, 10506, 2211, 916, 3977],
        ["3e du Bas-Rhin", 9864, 11123, 1758, 864, 4309],
        ["4e du Bas-Rhin", 7952, 14554, 6838, 1858, 7931],
        ["5e du Bas-Rhin", 7653, 15550, 4553, 1007, 10052],
        ["6e du Bas-Rhin", 7380, 11267, 9069, 1300, 10065],
        ["7e du Bas-Rhin", 4852, 5206, 13445, 677, 8183],
        ["8e du Bas-Rhin", 3951, 9849, 8807, 1200, 10527],
        ["9e du Bas-Rhin", 6030, 11748, 8695, 1673, 9043],
        ["1re du Haut-Rhin", 5027, 11791, 7014, 1103, 5866],
        ["2e du Haut-Rhin", 6797, 12272, 8907, 1236, 7893],
        ["3e du Haut-Rhin", 4774, 7563, 6894, 1279, 7838],
        ["4e du Haut-Rhin", 6792, 8469, 9874, 1497, 11622],
        ["5e du Haut-Rhin", 6452, 12801, 1717, 1424, 5122],
        ["6e du Haut-Rhin", 7186, 11996, 1618, 1688, 9415],
        ["1re du Rhône", 14654, 12792, 3377, 1529, 3617],
        ["2e du Rhône", 15232, 12562, 4077, 2438, 2392],
        ["3e du Rhône", 18283, 11835, 3483, 1872, 3039],
        ["4e du Rhône", 14479, 15566, 7530, 2989, 3300],
        ["5e du Rhône", 11063, 17507, 8449, 3058, 5864],
        ["6e du Rhône", 16545, 10777, 700, 1774, 4328],
        ["7e du Rhône", 8603, 4840, 6644, 1073, 3169],
        ["8e du Rhône", 10483, 15714, 11965, 3031, 8713],
        ["9e du Rhône", 9437, 10284, 12885, 2473, 8500],
        ["10e du Rhône", 11640, 18630, 8295, 4063, 5834],
        ["11e du Rhône", 9979, 14112, 6993, 2148, 9271],
        ["12e du Rhône", 10062, 13413, 9647, 2704, 4611],
        ["13e du Rhône", 8771, 11511, 6273, 2228, 8764],
        ["14e du Rhône", 9626, 6857, 448, 1449, 5846],
        ["1re de Haute-Saône", 8530, 10155, 8943, 1798, 13441],
        ["2e de Haute-Saône", 9188, 11353, 4337, 2053, 14573],
        ["1re de Saône-et-Loire", 9965, 13041, 2615, 1694, 6909],
        ["2e de Saône-et-Loire", 7627, 6188, 14031, 1373, 7179],
        ["3e de Saône-et-Loire", 8346, 12500, 4119, 1614, 10077],
        ["4e de Saône-et-Loire", 13144, 7893, 4952, 1500, 9733],
        ["5e de Saône-et-Loire", 9534, 9578, 8516, 1139, 7682],
        ["1re de la Sarthe", 7903, 8517, 6000, 1247, 6150],
        ["2e de la Sarthe", 12667, 6517, 2985, 987, 7261],
        ["3e de la Sarthe", 8193, 10071, 4439, 1347, 10570],
        ["4e de la Sarthe", 7878, 6876, 4261, 1196, 7672],
        ["5e de la Sarthe", 7768, 13267, 1619, 1455, 8944],
        ["1re de la Savoie", 9933, 12700, 5677, 1648, 9247],
        ["2e de la Savoie", 7635, 5470, 10720, 850, 6870],
        ["3e de la Savoie", 8793, 6095, 12788, 823, 7561],
        ["4e de la Savoie", 13548, 10306, 3995, 1363, 6354],
        ["1re de Haute-Savoie", 12464, 19000, 6830, 2341, 8472],
        ["2e de Haute-Savoie", 10931, 11329, 9093, 1856, 6345],
        ["3e de Haute-Savoie", 9831, 9087, 9129, 1513, 7296],
        ["4e de Haute-Savoie", 7990, 7678, 11501, 1488, 4455],
        ["5e de Haute-Savoie", 9600, 12323, 5124, 2098, 7070],
        ["6e de Haute-Savoie", 6572, 11670, 2347, 1643, 6853],
        ["1re de Paris", 12780, 19718, 4479, 3004, 1357],
        ["2e de Paris", 11890, 15547, 7948, 2827, 1294],
        ["3e de Paris", 15285, 12853, 5204, 1422, 1658],
        ["4e de Paris", 5087, 15730, 11085, 3252, 1412],
        ["5e de Paris", 21942, 13358, 1262, 1519, 1277],
        ["6e de Paris", 24155, 11514, 1767, 1314, 1507],
        ["7e de Paris", 19373, 16755, 2370, 1777, 1503],
        ["8e de Paris", 19490, 13059, 5282, 2051, 2165],
        ["9e de Paris", 16332, 10192, 2745, 1669, 1898],
        ["10e de Paris", 16039, 11030, 1927, 1602, 2075],
        ["11e de Paris", 16274, 16154, 5283, 2253, 1520],
        ["12e de Paris", 9829, 17380, 7724, 3441, 1804],
        ["13e de Paris", 13053, 16267, 5990, 3031, 2119],
        ["14e de Paris", 4654, 15964, 13527, 4211, 1435],
        ["15e de Paris", 19772, 6616, 2517, 1387, 1597],
        ["16e de Paris", 20829, 7534, 2153, 1092, 1454],
        ["17e de Paris", 16162, 5638, 1111, 1076, 1241],
        ["18e de Paris", 17632, 13922, 1398, 1248, 1318],
        ["1re de Seine-Maritime", 11045, 9424, 2886, 1372, 3094],
        ["2e de Seine-Maritime", 11113, 16332, 6591, 2016, 9733],
        ["3e de Seine-Maritime", 13544, 5026, 1115, 840, 5251],
        ["4e de Seine-Maritime", 18439, 7004, 1, 1614, 10105],
        ["5e de Seine-Maritime", 15440, 11834, 2266, 1468, 12867],
        ["6e de Seine-Maritime", 20800, 11010, 3395, 1590, 15325],
        ["7e de Seine-Maritime", 10304, 15505, 1648, 1351, 6064],
        ["8e de Seine-Maritime", 12227, 6120, 0, 854, 4636],
        ["9e de Seine-Maritime", 9449, 13184, 2176, 1181, 13591],
        ["10e de Seine-Maritime", 11709, 17045, 3981, 1987, 16399],
        ["1re de Seine-et-Marne", 8427, 8292, 3427, 1518, 5792],
        ["2e de Seine-et-Marne", 9107, 10981, 5754, 2444, 7345],
        ["3e de Seine-et-Marne", 8895, 5290, 8409, 1432, 7988],
        ["4e de Seine-et-Marne", 8394, 6953, 9007, 1786, 12742],
        ["5e de Seine-et-Marne", 8889, 11225, 2767, 1689, 9745],
        ["6e de Seine-et-Marne", 8986, 5976, 4943, 1667, 9044],
        ["7e de Seine-et-Marne", 11344, 8823, 3509, 1759, 8923],
        ["8e de Seine-et-Marne", 13044, 12301, 3287, 1958, 6610],
        ["9e de Seine-et-Marne", 9919, 9112, 4259, 1603, 8004],
        ["10e de Seine-et-Marne", 12544, 8612, 3882, 1204, 4412],
        ["11e de Seine-et-Marne", 12279, 5768, 1256, 919, 4589],
        ["1re des Yvelines", 11253, 15198, 7292, 5730, 3332],
        ["2e des Yvelines", 11296, 17391, 7262, 4078, 4215],
        ["3e des Yvelines", 8029, 18012, 6678, 4698, 4050],
        ["4e des Yvelines", 10780, 18308, 5523, 2826, 3739],
        ["5e des Yvelines", 9322, 14483, 7086, 2201, 3079],
        ["6e des Yvelines", 9322, 14378, 6747, 2617, 2993],
        ["7e des Yvelines", 10488, 11401, 5723, 1910, 5195],
        ["8e des Yvelines", 10054, 7336, 2365, 1055, 6729],
        ["9e des Yvelines", 9525, 11275, 4376, 2331, 9613],
        ["10e des Yvelines", 11030, 16727, 8571, 2926, 6482],
        ["11e des Yvelines", 10516, 8289, 5913, 1563, 3500],
        ["12e des Yvelines", 8704, 14028, 2700, 2100, 4393],
        ["1re des Deux-Sèvres", 12939, 13741, 7884, 1345, 5869],
        ["2e des Deux-Sèvres", 17477, 12049, 3048, 1389, 9328],
        ["3e des Deux-Sèvres", 8810, 13507, 6126, 1353, 7689],
        ["1re de la Somme", 15081, 7640, 2636, 1025, 8495],
        ["2e de la Somme", 10946, 10895, 3217, 1337, 5780],
        ["3e de la Somme", 7058, 7490, 11240, 1110, 13091],
        ["4e de la Somme", 8081, 10497, 6066, 1259, 13575],
        ["5e de la Somme", 7941, 7806, 6607, 1202, 13501],
        ["1re du Tarn", 9529, 8600, 1856, 1489, 8999],
        ["2e du Tarn", 17400, 16487, 0, 2342, 13775],
        ["3e du Tarn", 12308, 12281, 8996, 2252, 12267],
        ["1re du Tarn-et-Garonne", 15763, 8196, 4378, 2195, 10610],
        ["2e du Tarn-et-Garonne", 9892, 10084, 0, 2463, 15186],
        ["1re du Var", 6477, 10222, 2190, 3464, 8097],
        ["2e du Var", 7311, 11203, 2566, 3252, 12595],
        ["3e du Var", 8127, 13877, 5503, 4080, 13503],
        ["4e du Var", 6649, 14735, 2454, 11983, 12784],
        ["5e du Var", 5477, 12355, 2894, 4868, 16350],
        ["6e du Var", 10289, 13988, 3619, 4366, 19832],
        ["7e du Var", 6830, 12226, 5145, 4371, 13185],
        ["8e du Var", 9484, 12876, 2735, 4657, 15474],
        ["1re du Vaucluse", 9338, 6985, 1359, 1428, 9160],
        ["2e du Vaucluse", 8804, 9432, 4097, 4308, 10662],
        ["3e du Vaucluse", 6947, 7985, 2418, 2364, 13430],
        ["4e du Vaucluse", 7453, 10381, 3152, 0, 16850],
        ["5e du Vaucluse", 9134, 10244, 7044, 1932, 9635],
        ["1re de Vendée", 13106, 16624, 9191, 1971, 8791],
        ["2e de Vendée", 12053, 14334, 9572, 2157, 9665],
        ["3e de Vendée", 11546, 23870, 10475, 1355, 14154],
        ["4e de Vendée", 8498, 10531, 16904, 0, 5218],
        ["5e de Vendée", 8261, 15353, 4385, 1720, 8618],
        ["1re de la Vienne", 12972, 11226, 5324, 1181, 6254],
        ["2e de la Vienne", 14394, 15416, 0, 1766, 5641],
        ["3e de la Vienne", 7585, 7637, 2362, 1510, 7697],
        ["4e de la Vienne", 7937, 12919, 0, 1434, 9739],
        ["1re de Haute-Vienne", 14675, 11907, 3756, 1756, 7884],
        ["2e de Haute-Vienne", 18381, 7957, 6080, 1920, 10244],
        ["3e de Haute-Vienne", 13079, 8384, 4177, 1695, 8117],
        ["1re des Vosges", 6643, 5439, 13276, 1205, 7316],
        ["2e des Vosges", 6061, 10235, 4024, 0, 9762],
        ["3e des Vosges", 5669, 3758, 15136, 721, 5805],
        ["4e des Vosges", 5220, 4490, 7028, 769, 8530],
        ["1re de l'Yonne", 9339, 7509, 8709, 1835, 9214],
        ["2e de l'Yonne", 7589, 10402, 0, 1665, 10936],
        ["3e de l'Yonne", 8126, 9114, 4588, 1461, 14897],
        ["1re du Territoire de Belfort", 4828, 4671, 6196, 782, 4868],
        ["2e du Territoire de Belfort", 5943, 4134, 3669, 1158, 4307],
        ["1re de l'Essonne", 10657, 6139, 2701, 1044, 3990],
        ["2e de l'Essonne", 10588, 8848, 6276, 2208, 9839],
        ["3e de l'Essonne", 13941, 12447, 5112, 1899, 8612],
        ["4e de l'Essonne", 13517, 15598, 5044, 2674, 7818],
        ["5e de l'Essonne", 14830, 11849, 6222, 1497, 2774],
        ["6e de l'Essonne", 15730, 12915, 2448, 1650, 4361],
        ["7e de l'Essonne", 11299, 10309, 2038, 1254, 4537],
        ["8e de l'Essonne", 10799, 7929, 3551, 0, 11804],
        ["9e de l'Essonne", 11454, 10520, 3303, 1754, 5602],
        ["10e de l'Essonne", 9640, 6779, 2068, 948, 3994],
        ["1re des Hauts-de-Seine", 13218, 4913, 1147, 764, 2128],
        ["2e des Hauts-de-Seine", 10465, 10227, 9541, 1639, 1660],
        ["3e des Hauts-de-Seine", 10348, 14515, 13949, 2269, 2348],
        ["4e des Hauts-de-Seine", 13122, 13472, 0, 1925, 3337],
        ["5e des Hauts-de-Seine", 10732, 12877, 4236, 1905, 2029],
        ["6e des Hauts-de-Seine", 6420, 14943, 5517, 3749, 3056],
        ["7e des Hauts-de-Seine", 8842, 20120, 8694, 3233, 3054],
        ["8e des Hauts-de-Seine", 9398, 15547, 6073, 2233, 2082],
        ["9e des Hauts-de-Seine", 6200, 10307, 7672, 2538, 1507],
        ["10e des Hauts-de-Seine", 13233, 20679, 0, 3055, 2992],
        ["11e des Hauts-de-Seine", 16359, 13132, 0, 1769, 2817],
        ["12e des Hauts-de-Seine", 14883, 15423, 6558, 2253, 3927],
        ["13e des Hauts-de-Seine", 13976, 16441, 8259, 2592, 2929],
        ["1re de Seine-Saint-Denis", 13608, 4780, 616, 636, 1829],
        ["2e de Seine-Saint-Denis", 11083, 1595, 622, 375, 1480],
        ["3e de Seine-Saint-Denis", 11223, 8399, 2777, 1285, 3840],
        ["4e de Seine-Saint-Denis", 7341, 2007, 975, 625, 2290],
        ["5e de Seine-Saint-Denis", 8786, 1854, 7745, 545, 2235],
        ["6e de Seine-Saint-Denis", 12797, 3419, 1172, 560, 1584],
        ["7e de Seine-Saint-Denis", 22718, 5773, 799, 872, 1735],
        ["8e de Seine-Saint-Denis", 9263, 5696, 3647, 1226, 3610],
        ["9e de Seine-Saint-Denis", 16393, 6214, 1049, 959, 2491],
        ["10e de Seine-Saint-Denis", 9812, 2593, 4959, 771, 2951],
        ["11e de Seine-Saint-Denis", 9400, 2181, 269, 549, 2672],
        ["12e de Seine-Saint-Denis", 7485, 5793, 3512, 1278, 3743],
        ["1re du Val-de-Marne", 11908, 12291, 8183, 2445, 3835],
        ["2e du Val-de-Marne", 12440, 6024, 1713, 894, 2792],
        ["3e du Val-de-Marne", 9655, 7804, 4801, 1303, 4221],
        ["4e du Val-de-Marne", 10238, 10085, 5760, 1820, 4679],
        ["5e du Val-de-Marne", 13452, 12544, 8564, 2197, 3537],
        ["6e du Val-de-Marne", 16061, 16126, 2791, 2771, 2432],
        ["7e du Val-de-Marne", 11200, 7153, 5514, 1125, 2856],
        ["8e du Val-de-Marne", 11847, 7964, 15767, 1719, 2240],
        ["9e du Val-de-Marne", 10612, 4453, 927, 749, 2297],
        ["10e du Val-de-Marne", 16122, 6113, 1407, 1100, 2817],
        ["11e du Val-de-Marne", 14739, 7663, 1142, 1085, 2514],
        ["1re du Val-d'Oise", 11230, 9472, 4760, 2007, 8377],
        ["2e du Val-d'Oise", 9652, 10252, 3092, 1882, 6439],
        ["3e du Val-d'Oise", 12537, 12284, 5282, 2199, 6989],
        ["4e du Val-d'Oise", 10984, 10397, 4479, 2021, 4659],
        ["5e du Val-d'Oise", 11218, 5264, 2447, 0, 2921],
        ["6e du Val-d'Oise", 10019, 7470, 4125, 1961, 3994],
        ["7e du Val-d'Oise", 9018, 7846, 2193, 1794, 4253],
        ["8e du Val-d'Oise", 6485, 4263, 1499, 574, 1998],
        ["9e du Val-d'Oise", 7583, 5219, 3335, 1300, 5309],
        ["10e du Val-d'Oise", 9193, 6565, 1656, 769, 3993],
    ];
    const [report, setReport] = useState([
        [25, 20, 31, 24, 30, 15],
        [15, 30, 34, 18, 50, 10],
        [9, 64, 26, 27, 49, 32],
        [30, 18, 20, 20, 10, 40]
    ]);
    
    let uncertainty = 2;

    let poll = "Harris Interactive";

    useEffect(() => displayFirstRound(), []);
    useEffect(() => displayReportMatrix(), []);
    useEffect(() => displayUncertainty(), []);
    useEffect(() => displayResult(), []);
    useEffect(() => displayChart(), []);

    let coordinates = putCoordinatesGood()
    
    function putCoordinatesGood() {
        let goodCoordinates = [];
        for(let i=0;i<data.features.length;i++){
            if(data.features[i].geometry.type == "Polygon") {
                let tempCoordinates = [];
                for(let j=0;j<data.features[i].geometry.coordinates[0].length;j++){
                    tempCoordinates.push([data.features[i].geometry.coordinates[0][j][1], data.features[i].geometry.coordinates[0][j][0]]);
                }
                goodCoordinates.push(tempCoordinates);
            } else {
                let tempCoordinates = [];
                for(let k=0; k<data.features[i].geometry.coordinates[0].length;k++){
                    let veryTempCoordinates = [];
                    for(let l=0; l<data.features[i].geometry.coordinates[0][k].length;l++) {
                        veryTempCoordinates.push([data.features[i].geometry.coordinates[0][k][l][1], data.features[i].geometry.coordinates[0][k][l][0]]);
                    }
                    tempCoordinates.push(veryTempCoordinates);
                }
                goodCoordinates.push(tempCoordinates);
            }
        }
        console.log(goodCoordinates);
        return goodCoordinates;
    }

    function calculate() {
        for(let i=0; i<4; i++) {
            for(let j=3; j<6; j++) {
                parties[i][j] = 0;
            }
        }
        parties[0][2] = "#E81502";
        parties[1][2] = '#FFCC00';
        parties[2][2] = '#3399FF';
        parties[3][2] = "#723E64";

        parties[0][6] = 25.66;
        parties[1][6] = 25.75;
        parties[2][6] = 11.29;
        parties[3][6] = 18.68;

        setTableDisplay([]);
        let newTable = [];

        setMapDisplay([]);
        let newMap = [];

        duals = [
            ["NUPES", 0, 0, 0],
            ["ENSEMBLE", 0, 0, 0],
            ["LR", 0, 0, 0],
            ["RN", 0, 0, 0]
        ];

        for(let i=0; i<circos.length; i++) {

            let nupesScore = circos[i][1]*parseInt(parties[0][1])/parseInt(parties[0][6]);
            let ensembleScore = circos[i][2]*parseInt(parties[1][1])/parseInt(parties[1][6]);
            let lrScore = circos[i][3]*parseInt(parties[2][1])/parseInt(parties[2][6]);
            let rnScore = circos[i][5]*parseInt(parties[3][1])/parseInt(parties[3][6]);
            let scores = [nupesScore, ensembleScore, lrScore, rnScore];

            let winnerIndex = scores.indexOf(Math.max(...scores));
            delete scores[winnerIndex];
            scores[winnerIndex] = -1;
            let secondIndex = scores.indexOf(Math.max(...scores));

            if(winnerIndex < 0) {
                winnerIndex = 0;
            }
            if(secondIndex < 0) {
                secondIndex = 1;
            }

            let winnerScore = 0;
            let secondScore = 0;

            let winnerName = winnerIndex == 0 ? "NUPES" : (winnerIndex == 1 ? "ENSEMBLE" : (winnerIndex == 2 ? "LR" : "RN"));
            let secondName = secondIndex == 0 ? "NUPES" : (secondIndex == 1 ? "ENSEMBLE" : (secondIndex == 2 ? "LR" : "RN"));

            if(winnerIndex == 0 && secondIndex == 1) {
                winnerScore = nupesScore + circos[i][3]*report[2][0]/100 + circos[i][5]*report[3][0]/100;
                secondScore = ensembleScore + circos[i][3]*report[2][1]/100 + circos[i][5]*report[3][1]/100;
            } else if(winnerIndex == 1 && secondIndex == 0) {
                secondScore = nupesScore + circos[i][3]*report[2][0]/100 + circos[i][5]*report[3][0]/100;
                winnerScore = ensembleScore + circos[i][3]*report[2][1]/100 + circos[i][5]*report[3][1]/100;
            } else if(winnerIndex == 0 && secondIndex == 2) {
                winnerScore = nupesScore + circos[i][2]*report[1][0]/100 + circos[i][5]*report[3][2]/100;
                secondScore = lrScore + circos[i][2]*report[1][1]/100 + circos[i][5]*report[3][3]/100;
            } else if(winnerIndex == 2 && secondIndex == 0) {
                secondScore = nupesScore + circos[i][2]*report[1][0]/100 + circos[i][5]*report[3][2]/100;
                winnerScore = lrScore + circos[i][2]*report[1][1]/100 + circos[i][5]*report[3][3]/100;
            } else if(winnerIndex == 0 && secondIndex == 3) {
                winnerScore = nupesScore + circos[i][2]*report[1][2]/100 + circos[i][3]*report[2][3]/100;
                secondScore = rnScore + circos[i][2]*report[1][2]/100 + circos[i][3]*report[2][3]/100;
            } else if(winnerIndex == 3 && secondIndex == 0) {
                secondScore = nupesScore + circos[i][2]*report[1][2]/100 + circos[i][3]*report[2][3]/100;
                winnerScore = rnScore + circos[i][2]*report[1][2]/100 + circos[i][3]*report[2][3]/100;
            } else if(winnerIndex == 1 && secondIndex == 2) {
                winnerScore = ensembleScore + circos[i][1]*report[0][0]/100 + circos[i][4]*report[3][4]/100;
                secondScore = lrScore + circos[i][1]*report[0][1]/100 + circos[i][4]*report[3][5]/100;
            } else if(winnerIndex == 2 && secondIndex == 1) {
                secondScore = ensembleScore + circos[i][1]*report[0][0]/100 + circos[i][4]*report[3][4]/100;
                winnerScore = lrScore + circos[i][1]*report[0][1]/100 + circos[i][4]*report[3][5]/100;
            } else if(winnerIndex == 1 && secondIndex == 3) {
                winnerScore = ensembleScore + circos[i][1]*report[0][2]/100 + circos[i][3]*report[2][4]/100;
                secondScore = rnScore + circos[i][1]*report[0][3]/100 + circos[i][3]*report[2][5]/100;
            } else if(winnerIndex == 3 && secondIndex == 1) {
                secondScore = ensembleScore + circos[i][1]*report[0][2]/100 + circos[i][3]*report[2][4]/100;
                winnerScore = rnScore + circos[i][1]*report[0][3]/100 + circos[i][3]*report[2][5]/100;
            } else if(winnerIndex == 2 && secondIndex == 3) {
                winnerScore = lrScore + circos[i][1]*report[0][4]/100 + circos[i][2]*report[1][4]/100;
                secondScore = rnScore + circos[i][1]*report[0][5]/100 + circos[i][2]*report[1][5]/100;
            } else if(winnerIndex == 3 && secondIndex == 2) {
                secondScore = lrScore + circos[i][1]*report[0][4]/100 + circos[i][2]*report[1][4]/100;
                winnerScore = rnScore + circos[i][1]*report[0][5]/100 + circos[i][2]*report[1][5]/100;
            }

            let electedName = winnerScore >= secondScore ? winnerName : secondName ;
            let electedIndex = winnerScore >= secondScore ? winnerIndex : secondIndex ; 
            let electedScore = winnerScore >= secondScore ? parseInt(100*winnerScore/(winnerScore + secondScore)) : parseInt(100*secondScore/(winnerScore + secondScore)) ;
            let notElectedName = winnerScore >= secondScore ? secondName : winnerName;

            if(electedName == "NUPES" && notElectedName == "ENSEMBLE") {
                duals[0][1] += 1;
            } else if(electedName == "ENSEMBLE" && notElectedName == "NUPES") {
                duals[1][1] += 1;
            } else if(electedName == "NUPES" && notElectedName == "LR") {
                duals[0][2] += 1;
            } else if(electedName == "NUPES" && notElectedName == "RN") {
                duals[0][3] += 1;
            } else if(electedName == "ENSEMBLE" && notElectedName == "LR") {
                duals[1][2] += 1;
            } else if(electedName == "ENSEMBLE" && notElectedName == "RN") {
                duals[1][3] += 1;
            } else if(electedName == "LR" && notElectedName == "NUPES") {
                duals[2][1] += 1;
            } else if(electedName == "LR" && notElectedName == "ENSEMBLE") {
                duals[2][2] += 1;
            } else if(electedName == "LR" && notElectedName == "RN") {
                duals[2][3] += 1;
            } else if(electedName == "RN" && notElectedName == "NUPES") {
                duals[3][1] += 1;
            } else if(electedName == "RN" && notElectedName == "ENSEMBLE") {
                duals[3][2] += 1;
            } else if(electedName == "RN" && notElectedName == "LR") {
                duals[3][3] += 1;
            }

            if(winnerScore/(winnerScore+secondScore)>(50+parseInt(uncertainty))/100) {
                parties[winnerIndex][3] += 1;
                parties[winnerIndex][4] += 1;
                parties[winnerIndex][5] += 1;
            } else if(secondScore/(secondScore + winnerScore)>(50+parseInt(uncertainty))/100) {
                parties[secondIndex][3] += 1;
                parties[secondIndex][4] += 1;
                parties[secondIndex][5] += 1;
            } else if (winnerScore >= secondScore) {
                parties[winnerIndex][4] += 1;
                parties[winnerIndex][5] += 1;
                parties[secondIndex][5] += 1;
            } else {
                parties[secondIndex][4] += 1;
                parties[secondIndex][5] += 1;
                parties[winnerIndex][5] += 1;
            }
            
            newTable.push(
                    <tr class={i % 2 == 0 ? "table-primary" : "table-secondary"}>
                        <th scope="row">{circos[i][0]}</th>
                        <td>{winnerName} / {secondName}</td>
                        <td>{electedName} ({electedScore}%)</td>
                    </tr>
                );

            newMap.push(
                <Pane style={{ zIndex: 999 }}>
                    <Polygon pathOptions={{color: parties[electedIndex][2]}} positions={coordinates[i]}>
                        <Tooltip sticky pane="ttPane" opacity={2}>{circos[i][0]} : {electedName}</Tooltip>
                    </Polygon>
                </Pane>
            );

        }
        setTableDisplay(newTable);
        setMapDisplay(newMap);
        displayResult();
        displayChart();
        displayDuals();
    }

    function displayDuals() {

        let newDualChart = [];

        const options =  {
            chart: {
              type: 'bar',
              backgroundColor: 'transparent'
            },
            title: {
              text: ''
            },
            xAxis: {
              categories: ['NUPES/ENSEMBLE', 'ENSEMBLE/RN', 'NUPES/RN', 'LR/Autres']
            },
            yAxis: {
              min: 0,
              title: {
                text: 'Sièges'
              }
            },
            legend: {
              reversed: true
            },
            plotOptions: {
              series: {
                stacking: 'normal',
                dataLabels: {
                  enabled: true
                }
              }
            },
            series: [{
                name: 'Autres',
                data: ['', '', '', duals[0][2] + duals[1][2] + duals[3][3]],
                color: '#888888'
              },{
                name: 'LR',
                data: ['', '', '', duals[2][1] + duals[2][2] + duals[2][3]],
                color: '#3399FF'
            }, {
                name: 'RN',
                data: ['', duals[3][2], duals[3][1], ''],
                color: '#723E64'
              },
              {
                name: 'ENSEMBLE',
                data: [duals[1][1], duals[1][3], '', ''],
                color: '#FFCC00'
              },
              {
              name: 'NUPES',
              data: [duals[0][1], '', duals[0][3], ''],
              color: '#E81502'
            }]
          };

          newDualChart.push(
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        );
        setDualsDisplay(newDualChart);
    }

    function displayChart() {
        let newChart = [];
        
            const options = {

                chart: {
                    type: 'item',
                    backgroundColor: 'transparent'
                  },
          
                  title: {
                    text: ''
                  },
                
                  legend: {
                    labelFormat: '{name} <span style="opacity: 0.4"></span>'
                  },
            
                series: [{
                    name: 'Sièges',
                    keys: ['name', 'y', 'color', 'label'],
                    data: [
                        ['NUPES', parties[0][4], "#E81502"],
                        ['ENSEMBLE', parties[1][4], '#FFCC00'],
                        ['LR', parties[2][4], '#3399FF'],
                        ['RN', parties[3][4], "#723E64"]
                    ],
                    dataLabels: {
                        enabled: false,
                        format: '{point.label}'
                    },
            
                    // Circular options
                    center: ['50%', '88%'],
                    size: '170%',
                    startAngle: -100,
                    endAngle: 100
                }]
            };
        newChart.push(
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        );
        setChartDisplay(newChart);
    }

    function changeParties(newValue, partyNumber, valueType) {
        if(valueType=="name") {
            parties[partyNumber] = [newValue, parties[partyNumber][1]];
        } else {
            parties[partyNumber] = [parties[partyNumber][0], newValue];
        } 
        displayFirstRound();
        calculate(); 
    }

    function displayFirstRound() {
        let newFirstRound = [];
        for(let i=0; i<4; i++) {
            newFirstRound.push(
            <div class="form-group d-flex flex-row m-2">
                <input 
                    class="form-control me-sm-2" 
                    type="input" 
                    placeholder="Parti"
                    value={parties[i][0]}
                    onChange={form => changeParties(form.target.value, i, "name")}
                ></input>
                <input 
                    class="form-control me-sm-2" 
                    type="input" 
                    placeholder="Score"
                    value={parties[i][1]}
                    onChange={form => changeParties(form.target.value, i, "score")}
                ></input>
            </div>
            );
        }
        setFirstRoundDisplay(newFirstRound);
    }

    function displayUncertainty() {
        let newUncertainty = [];
        newUncertainty.push(
            <div>
                <input 
                    type="range" 
                    class="form-range"
                    min="0"
                    max="10"
                    value={uncertainty}
                    onChange={form => { uncertainty = form.target.value ; displayUncertainty() ; }}
                >
                </input>
                {uncertainty}% d'incertitude 
            </div>
        );
        setUncertaintyDisplay(newUncertainty);
        calculate();
    }

    function changeReport(newNumber, partyNumber, duelNumber) {
        report[partyNumber][duelNumber] = newNumber;
        displayReportMatrix();
        calculate();
    }

    function displayReportMatrix() {
        let newMatrix = [];
        newMatrix.push(
            <div class="container">
                <div class="row">
                    <div class="col">
                    Perdant
                    </div>
                    <div class="col">
                    NUPES/ENS
                    </div>
                    <div class="col">
                    NUPES/LR
                    </div>
                    <div class="col">
                    NUPES/RN
                    </div>
                    <div class="col">
                    ENS/LR
                    </div>
                    <div class="col">
                    ENS/RN
                    </div>
                    <div class="col">
                    LR/RN
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    NUPES
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[0][0]}
                                onChange={form => changeReport(form.target.value, 0, 0)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[0][1]}
                                onChange={form => changeReport(form.target.value, 0, 1)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[0][2]}
                                onChange={form => changeReport(form.target.value, 0, 2)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[0][3]}
                                onChange={form => changeReport(form.target.value, 0, 3)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[0][4]}
                                onChange={form => changeReport(form.target.value, 0, 4)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[0][5]}
                                onChange={form => changeReport(form.target.value, 0, 5)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    ENSEMBLE
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[1][0]}
                                onChange={form => changeReport(form.target.value, 1, 0)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[1][1]}
                                onChange={form => changeReport(form.target.value, 1, 1)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[1][2]}
                                onChange={form => changeReport(form.target.value, 1, 2)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[1][3]}
                                onChange={form => changeReport(form.target.value, 1, 3)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[1][4]}
                                onChange={form => changeReport(form.target.value, 1, 4)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[1][5]}
                                onChange={form => changeReport(form.target.value, 1, 5)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    LR
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[2][0]}
                                onChange={form => changeReport(form.target.value, 2, 0)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[2][1]}
                                onChange={form => changeReport(form.target.value, 2, 1)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[2][2]}
                                onChange={form => changeReport(form.target.value, 2, 2)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[2][3]}
                                onChange={form => changeReport(form.target.value, 2, 3)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[2][4]}
                                onChange={form => changeReport(form.target.value, 2, 4)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[2][5]}
                                onChange={form => changeReport(form.target.value, 2, 5)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    RN
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[3][0]}
                                onChange={form => changeReport(form.target.value, 3, 0)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[3][1]}
                                onChange={form => changeReport(form.target.value, 3, 1)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[3][2]}
                                onChange={form => changeReport(form.target.value, 3, 2)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[3][3]}
                                onChange={form => changeReport(form.target.value, 3, 3)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[3][4]}
                                onChange={form => changeReport(form.target.value, 3, 4)}
                            ></input>
                            <input 
                                class="form-control report-form w-50" 
                                type="input" 
                                value={report[3][5]}
                                onChange={form => changeReport(form.target.value, 3, 5)}
                            ></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                    <div class="col">
                        <div class="row px-2">
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                            <input class="form-control report-form w-50" id="disabledInput" type="text" placeholder="" disabled="true"></input>
                        </div>
                    </div>
                </div>
            </div>
        );
        setMatrixReport(newMatrix);
    }

    function displayResult(){
        let newResult = [];
        newResult.push(
            <div>
                    <p>NUPES : entre {parties[0][3]} et {parties[0][5]} sièges</p>
                    <p>ENSEMBLE : entre {parties[1][3]} et {parties[1][5]} sièges</p>
                    <p>LR : entre {parties[2][3]} et {parties[2][5]} sièges</p>
                    <p>RN : entre {parties[3][3]} et {parties[3][5]} sièges</p>
            </div>
        );
        setResultDisplay(newResult);
    }

    return(
        <div class="d-flex flex-column m-2">
            <div class="d-flex flex-row">
                <div class="d-flex flex-column">
                    <h2>Résultats du 1er tour</h2>
                    {firstRoundDisplay}
                </div>
                <div class="d-flex flex-column">
                    <h2>Reports de voix</h2>
                    {matrixReport}
                    <h2 class="mt-3">Incertitude au second tour</h2>
                    {uncertaintyDisplay}
                </div>
            </div>
            <div class="d-flex flex-row mt-3">
                <div class="d-flex flex-column">
                    <h2>Simulation </h2>
                    {resultDisplay}
                </div>
                <div class="d-flex flex-column mean-repartition">
                    <h2>Répartition moyenne des sièges </h2>
                    {chartDisplay}
                </div>
            </div>
            <div class="d-flex flex-row mt-3">
                <div class="d-flex flex-column">
                    <h2>Résultats par circonscription </h2>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Circonscription</th>
                                <th scope="col">Premier tour</th>
                                <th scope="col">Second tour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableDisplay}
                        </tbody>
                    </table>
                </div>
                <div class="d-flex flex-column dual-repartition">
                    <h2>Configurations de second tour</h2>
                    {dualsDisplay}
                    <h2>Carte des circonscriptions</h2>
                    <MapContainer center={[47.229064, 1.479026]} zoom={6} scrollWheelZoom={false} className="custom-map">
                        <Pane name="ttPane" style={{ zIndex: 1000 }}>
                            {mapDisplay}
                        </Pane>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}