//Account
export const apiGetAccountByToken = `Account/GetAccount`
export const apiUpdateByAccountID = `Account/UpdateByAccountID`

export const apiGetUnitInformation = `Account/GetUnitInformation`
export const apiUpdateUnitInformation = `Account/UpdateUnitInformation`

//Authenticate
export const apiLogin = `Authservice/Login`
export const apiLogout = `Authservice/Logout`
export const apiRegister = `Authservice/Register`
export const apiForgotPassword = `Authservice/ForgotPassword`
export const apiChangePassword = `Authservice/ChangePassword`
export const apiVerifyCode = `Authservice/VerifyCode`
export const apiBusinessRegister = `Authservice/BusinessRegister`

// User
export const apiInsertUser = "User/Insert"
export const apiDeleteUser = "User/Delete"
export const apiDetailUser = "User/GetDetail"
export const apiUpdateUser = "User/Update"
export const apiGetListUser = "User/GetList"
export const apiImportUser = "User/ImportUser"
export const apiExportUser = "User/ExportUser"
export const apiGetTemplateFileImportUser = "User/GetTemplateFileImportUser"
export const apiGetListGuest = "User/GetListGuest"
export const apiGetAccount = "User/GetAccount"
export const apiExportGuest = "User/ExportGuest"
export const apiImportGuest = "User/ImportGuest"
export const apiGetTemplateFileImportGuest = "User/GetTemplateFileImportGuest"
export const apiUpdateAccount = "User/UpdateAccount"
export const apiReplacePassword = "User/ReplacePassword"
export const apiGetInforUser = "User/GetInforUser"
export const apiChangeInfor = "User/ChangeInfor"
export const apiChangeImgUser = "User/ChangeImgUser"

// Department
export const apiGetList = `Department/GetList`
export const apiGetListUserByDept = `Department/ListUserByDept`
export const apiDeleteDept = `Department/DeleteDept`
export const apiInsertUpdate = `Department/InsertUpdate`
export const apiGetAllDept = "Department/GetAllForCombobox"
// Common
export const apiGetSystemKey = "Common/GetSystemKey"

//POSITION

export const apiGetAllPosition = "Position/GetListPositionForCombobox"
export const apiGetListPosition = "Position/GetList"
export const apiCreate = "Position/Create"
export const apiDelete = "Position/Delete"
export const apiUpdate = "Position/Update"
export const apiGetAllTitle = "Position/GetListTitleForCombobox"
// CATEFORY_POST

export const apiGetListCategoryPost = "CategoryPost/GetListPostGroup"
export const apiGetCategoryPostCate = "CategoryPost/GetCategoryPost"
export const apiSortCategories = "CategoryPost/SortCategories"

export const apiInsertCategory = "CategoryPost/Insert"
export const apiUpdateCategory = "CategoryPost/Update"
export const apiDeleteCategory = "CategoryPost/Delete"

// POST

export const apiGetListPost = "Post/GetList"
export const apiInsertPost = "Post/Insert"
export const apiGetDetailPost = "Post/GetDetail"
export const apiUpdatePost = "Post/Update"
export const apiDeletePost = "Post/Delete"
export const apiRePost = "Post/RePost"
export const apiCancelPost = "Post/CancelPost"
export const apiSortPost = "Post/SortPost"
export const apiKhoiPhuc = "Post/KhoiPhuc"
export const apiGetListHistory = "Post/GetListHistory"
export const apiGetDetailHistory = "Post/GetDetailHistory"
export const apiUpdateStatusPost = "Post/UpdateStatusPost"
export const apiExportPost = "Post/ExportPost"

// Role
export const apiGetByRoleId = `Role/GetByRoleId`
export const apiCreateOrUpdateRole = `Role/CreateOrUpdateRole`
export const apiGetListRole = `Role/GetList`
export const apiGetAllForCombobox = `Role/GetAllForCombobox`
export const apiDeleteRole = `Role/DeleteRole`
export const apiGetListTab = `Role/GetListTab`
export const apiGetListTask = `Role/GetListTask`

// Region
export const apiGetAllChidrenByRegionId = `Region/getAllChidrenByRegionId`
export const apiInsertRegion = `Region/Insert`
export const apiUpdateRegion = `Region/Update`
export const apiDeleteRegion = `Region/Delete`
export const apigetLocationVN = `Region/GetLocationVN`
export const apiGetByRegionId = `Guest/GetByRegionId`

// TAGS

export const apiGetListTags = "Tags/GetList"
export const apiInsertTags = "Tags/Insert"
export const apiUpdateTags = "Tags/Update"
export const apiDeleteTags = "Tags/Delete"
export const apiGetAllTags = "Tags/GetAllForCombobox"

// UPLOAD

export const apiUploadFile = "File/UploadFile"
export const apiUploadFileList = "File/UploadListFileSeaWeed"

//Directory
export const apiGetAllUserDirectory = "Directory/GetAllUserDirectory"
export const apiInsertUserDirectory = "Directory/InsertUserDirectory"
export const apiUpdateUserDirectory = "Directory/UpdateUserDirectory"
export const apiDeleteUserDirectory = "Directory/DeleteUserDirectory"
export const apiBlockUserDirectory = "Directory/BlockUserDirectory"
export const apiResetPasswordByUserID = "Directory/ResetPasswordByUserID"

//CheckRegister
export const apiApproveRegister = "CheckRegister/ApproveRegister"
export const apiGetAllCheckRegister = "CheckRegister/GetAllCheckRegister"
export const apiGetDetailCheclRegister = "CheckRegister/GetDetailCheclRegister"

//Contact
export const apiSearchGetSupportListRequet =
  "Contact/SearchGetSupportListRequet"
export const apiStatusSupport = "Contact/StatusSupport"
export const apiGetDetailContact = "Contact/GetDetailContact"
export const apiSendContact = "Contact/SendContact"

// Topic
export const apiGetListTopic = "Topic/GetList"
export const apiDeleteTopicCategory = "Topic/DeleteTopicCategory"
export const apiCreateTopicCategory = "Topic/CreateTopicCategory"
export const apiUpdateTopicCategory = "Topic/UpdateTopicCategory"

// TopicPost
export const apiGetAllOrBySearch = "TopicPost/GetAllOrBySearch"
export const apiGetTopicByType = "TopicPost/GetTopicByType"
export const apiInsertTopicPost = "TopicPost/InsertTopicPost"
export const apiUpdateTopicPost = "TopicPost/UpdateTopicPost"
export const apiDeleteTopicPostById = "TopicPost/DeleteTopicPostById"
export const apiExportDocumentText = "TopicPost/ExportDocumentText"

//PostComment
export const apiPostCommentInsert = "PostComment/PostCommentInsert"
export const apiPostCommentUserLike = "PostComment/PostCommentUserLike"
export const apiPostCommentDelete = "PostComment/PostCommentDelete"
export const apiPostCommentUpdate = "PostComment/PostCommentUpdate"
export const apiGetAllPostCommnetByType = "PostComment/GetAllPostCommnetByType"

//Notify
export const apiGetListNotify = "Notify/GetList"
export const apiGetNewNotification = "Notify/GetNewNotification"
export const apiMarkAsRead = "Notify/MarkAsRead?NotifyId="
export const apiMarkAsSeen = "Notify/MarkAsSeen?NotifyId="
export const apiDeleteNotifyForUser = "Notify/DeleteNotifyForUser?NotifyId="
export const apiGetListByReferenceId = "Notify/GetListByReferenceId"

//Guest

export const apiGetListStaticNavbar = "Guest/GetListStaticNavbar"
