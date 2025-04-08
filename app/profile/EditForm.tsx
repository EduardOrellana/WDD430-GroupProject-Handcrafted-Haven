type Props = {
  user: {
    name: string
    email: string
    bio: string
    profilePic: string
  }
}

export default function EditForm({ user }: Props) {
  return (
    <form>
      <label>Name</label>
      <input defaultValue={user.name} />

      <label>Email</label>
      <input defaultValue={user.email} />

      <label>Bio</label>
      <textarea defaultValue={user.bio} />

      <button type="submit">Save Changes</button>
    </form>
  )
}
