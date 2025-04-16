
import CreateUserForm from './createUserForm';

export default async function CreateUserPage() {


  // Puedes agregar validaciones para permitir solo admins si quieres:
  // if (session.user.role !== 'admin') {
  //   return <div>You do not have permission to create users.</div>;
  // }

  return <CreateUserForm />;
}
