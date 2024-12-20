const apiUrl = 'https://api.integrolaw.az/api/v1';

export const environment = {
  production: false,
  loginUrl: `${apiUrl}/Auth/Login`,
  getHomePageInfo: `${apiUrl}/HomePages/GetActiveWithLang`,
  getAboutInfo: `${apiUrl}/Abouts`,
  getBlogPageInfo: `${apiUrl}/Blogs/GetListWithLang`,
  getBlogInfo: `${apiUrl}/Blogs`,
  caseEvaluation: `${apiUrl}/CaseEvaluations`,
  getContactPageInfo: `${apiUrl}/Contacts/GetActiveWithLang`,
  getEmployeesInfo: `${apiUrl}/Employees/GetListWithLang`,
  getEmployeeId: `${apiUrl}/Employees`,
  getPageSettingsInfo: `${apiUrl}/PageSettings/GetByPageNameWithLang`,
  getPartnersInfo: `${apiUrl}/Partners`,
  getServicesInfo: `${apiUrl}/Services/GetListWithLang`,
  getServiceInfoId: `${apiUrl}/Services/GetByIdWithLang`,
  feedback: `${apiUrl}/FeedbackAndSuggestions`,
};
