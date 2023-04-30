import RegisterCompanyInputData from './RegisterCompanyInputDataType';

type RegisterStudentInputData = {
  firstName: string,
  lastName: string,
};

export function isRegisterStudentInputData(inputData: RegisterCompanyInputData | RegisterStudentInputData): inputData is RegisterStudentInputData {
  return (inputData as RegisterStudentInputData).firstName !== undefined &&
         (inputData as RegisterStudentInputData).lastName !== undefined;
}

export default RegisterStudentInputData;
