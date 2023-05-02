import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //Notification
  requestIdInNotify: '',
  tabInNotify: '1',

  RequestIdNew: '',
  listServiceOfGroup: [],
  listAllExamination: [],
  listExaminationAdditionalId: [],
  listHealthFacility: [],
  dataStep3: {
    listGroupId: [],
    listDeptId: [],
    listUserId: [],
    typeSelect: 1
  },
  requestDetail: {},
  changeServiceUpdate: false
}

export const requestOrderSlice = createSlice({
  name: 'requestOrder',
  initialState,
  reducers: {
    setChangeServiceUpdate: (state, action) => {
      state.changeServiceUpdate = action.payload
    },
    changeRequestIdInNotify: (state, action) => {
      state.requestIdInNotify = action.payload
    },
    changeRequestTabInNotify: (state, action) => {
      state.tabInNotify = action.payload
    },
    changeListServiceOfGroup: (state, action) => {
      state.listServiceOfGroup = action.payload
    },
    changeRequestIdNew: (state, action) => {
      state.RequestIdNew = action.payload
    },
    changeListHealthFacility: (state, action) => {
      state.listHealthFacility = action.payload
    },
    changeListAllExamination: (state, action) => {
      state.listAllExamination = action.payload
    },
    changeListExaminationAdditionalId: (state, action) => {
      state.listExaminationAdditionalId = action.payload
    },
    changeDataStep3: (state, action) => {
      state.dataStep3 = action.payload
    },
    setRequestDetail: (state, action) => {
      state.requestDetail = action.payload
    },
    resetData: state => {
      state.dataStep3 = {
        listGroupId: [],
        listDeptId: [],
        listUserId: [],
        typeSelect: 1
      }
      state.RequestIdNew = ''
      state.requestDetail = {}
      state.listServiceOfGroup = []
      state.listExaminationAdditionalId = []
      state.listHealthFacility = []
      state.changeServiceUpdate = false
    }
  }
})

export const {
  changeListServiceOfGroup,
  changeRequestIdInNotify,
  changeRequestTabInNotify,
  changeRequestIdNew,
  changeListHealthFacility,
  changeListExaminationAdditionalId,
  changeListAllExamination,
  changeDataStep3,
  resetData,
  setChangeServiceUpdate,
  setRequestDetail
} = requestOrderSlice.actions

export default requestOrderSlice.reducer
