let menus = [
    { id: '1', level: 1, name: '第一層-第一個', type: "link", url: "/" },
    {
        id: '2', level: 1, name: '第一層-第二個', type: "button", isExpanded: false, isSelected: false,
        subMenu: [
            { id: '2-1', level: 2, name: '第二層第一個', type: "link", url: "/" },
            {
                id: '2-2', level: 2, name: '第二層第二個', type: "button", isExpanded: false, isSelected: false,
                subMenu: [{ id: '2-2-1', level: 3, name: '2-2-1', type: "link", url: "/" }]
            },
        ]

    },
    { id: '3', level: 1, name: '第一層-第三個', type: "link", url: "/" },
]

let levelNum = 1;
let startExpand = []; // 重新整理後保留
function setExpand(source, url) {
    let sourceItem = '';
    for (let i = 0; i < source.length; i++) {
        sourceItem = JSON.stringify(source[i]);
        if (sourceItem.indexOf(url) > -1) {
            if (source[i].type === 'button') {
                source[i].isSelected = true;
                source[i].isExpanded = true;
                startExpand.push(source[i]);
                // 遞迴下個層級
                setExpand(source[i].subMenu, url);
            }
            break;
        }
    }
}

const state = {
    menus,
    levelNum
}

const mutations = {
    findParents(state, payload) {
        if (payload.menu.type === "button") {
            payload.menu.isExpanded = !payload.menu.isExpanded;
        } else if (payload.menu.type === "link") {
            if (startExpand.length > 0) {
                for (let i = 0; i < startExpand.length; i++) {
                    startExpand[i].isSelected = false;
                }
            }
            startExpand = []; // 清空menu紀錄選項
            setExpand(state.menus, payload.menu.url);
        }
    },
    firstInit(state, payload) {
        setExpand(state.menus, payload.url);
    }
}

export {
    state,
    mutations,
};