const PLAYERS = ['W', 'N', 'E', 'S']

const strain_of_call = (call) => {
  if(call.length === 1){
    return ''
  } else {
    return call[1]
  }
}

const state = () => ({
  boardsHistory: {}, // {boardNum: history_of_board}
  history: [],
  boardNum: 1,
})

const getters = {
  curPlayer (state) {
    return PLAYERS[(state.boardNum + state.history.length) % 4]
  },
  dealer (state) {
    return PLAYERS[state.boardNum % 4]
  },
  boardNum (state) {
    return state.boardNum
  },
  vulerability (state) {
    return {
      'EW': [0, 3, 4, 6, 7, 9, 10, 13].includes(state.boardNum % 16),
      'NS': [2, 4, 5, 7, 10, 12, 13, 15].includes(state.boardNum % 16)
    }
  },
  history (state) {
    return state.history
  },
  historyByPlayers (state) {
    let hist = [...state.history]
    let hist_2 = [[], [], [], []]
    let i = state.boardNum % 4
    while (hist.length > 0){
      hist_2[i].push(hist.shift())
      i = (i + 1) % 4
    }
    return hist_2
  },
  biddingStates (state) {
    let bs = {}
    let i = state.history.length
    while (i--) {
      var curCall = state.history[i]
      if (curCall === 'P') continue
      if (curCall === 'R') {
        bs.rdblPos = i
        continue
      }
      if (curCall === 'X') {
        bs.dblPos = i
        continue
      }
      bs.lastBid = curCall
      bs.lastBidPos = i
      return bs
    }
    return bs
  },
  lastBid (state, getters) {
    return getters.biddingStates.lastBid
  },
  canDbl (state, getters) {
    let bs = getters.biddingStates
    if (bs.lastBidPos === undefined) return false
    if (bs.dblPos !== undefined) return false
    if (bs.rdblPos !== undefined) return false
    return state.history.length % 2 !== bs.lastBidPos % 2
  },
  canRdbl (state, getters) {
    let bs = getters.biddingStates
    if (bs.lastBidPos === undefined) return false
    if (bs.dblPos === undefined) return false
    if (bs.rdblPos !== undefined) return false
    return state.history.length % 2 !== bs.dblPos % 2
  },
  contract (state, getters) {
    let c = {}
    let len = state.history.length
    if (state.history[len - 1] !== 'P' || state.history[len - 2] !== 'P' || state.history[len - 3] !== 'P') {
      return c
    }
    if (state.history[len - 4] === 'P') {
      c.bid = 'PO'
      return c
    }
    let bs = getters.biddingStates
    c.bid = bs.lastBid
    for (let j = bs.lastBidPos % 2; j <= bs.lastBidPos; j += 2) {
      if (strain_of_call(state.history[j]) === strain_of_call(c.bid)) {
        c.declarer = PLAYERS[(state.boardNum + j ) % 4]
        break
      }
    }
    if (bs.rdblPos !== undefined) {
      c.pxr = 'R'
    } else if (bs.rdblPos !== undefined) {
      c.pxr = 'X'
    } else {
      c.pxr = 'P'
    }
    return c
  }
}

const mutations = {
  addHistory (state, call) {
    state.history.push(call)
  },
  advanceBoard (state) {
    state.boardsHistory[state.boardNum] = [...state.history]
    state.boardNum += 1
    state.history = state.boardNum in state.boardsHistory ? state.boardsHistory[state.boardNum] : []
  },
  undo (state) {
    if (state.history.length > 0) {
      state.history.pop()
    } else if (state.boardNum > 1) {
      state.boardNum -= 1
      state.history = state.boardNum in state.boardsHistory ? state.boardsHistory[state.boardNum] : []
    }
  },
  resetAll (state) {
    state.boardsHistory = {}
    state.history = []
    state.boardNum = 1
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}