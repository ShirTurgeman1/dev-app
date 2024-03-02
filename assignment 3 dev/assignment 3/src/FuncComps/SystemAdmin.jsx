import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SystemAdmin(props) {
    if (props.user.user_name == 'admin' && props.user.password == '!Ad1234321ad') {
        let previousUsersString = localStorage.getItem('users');
        let previousUsers = [];
        if (previousUsersString) {
            previousUsers = JSON.parse(previousUsersString);
        }

        // Dynamically create rows for each user
        const userRows = previousUsers.map((user, index) => (
            <tr key={index}>
                <td>{user.user_name}</td>
                <td>{user.first_name+` `+user.last_name}</td>
                <td>{user.date_of_birth}</td>
                <td>{user.street+` `+user.number+`, `+user.city}</td>
                <td>{user.email}</td>
                <td onClick={() => btnedit(user)}><EditIcon /></td>
                <td onClick={() => btndelete(user)}><DeleteIcon /></td>
            </tr>
        ));

        function btnedit(user) {
            props.SetUserToEdit(user);
            props.SetShowEdit(true);
            
        }

        function btndelete(user) {
            deleteUser(user);
        }

        function deleteUser(user) {
            let previousUsersString = localStorage.getItem('users');
            let previousUsers = [];
            if (previousUsersString) {
                previousUsers = JSON.parse(previousUsersString);
                previousUsers.forEach((element, index) => {
                    if (user.email === element.email) {
                    previousUsers.splice(index, 1);
                    //localStorage.clear();
                    let userString = JSON.stringify(previousUsers);
                    localStorage.setItem('users', userString);
                    props.SetupdateAdminTable(user);
                    Swal.fire({
                        title: 'user removed successfuly',
                        icon: 'success',
                        confirmButtonText: 'OK'
                        });
                    }
                });
            }
        }

        // Render table only if there are users
        const table = previousUsers.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>User name</th>
                        <th>Full name</th>
                        <th>Date of birth</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userRows}
                </tbody>
            </table>
        );

        return (
            <div>
                {table}
            </div>
        );
    }
    
}
