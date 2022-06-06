
export const fileUpload = async (file) => {
  const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL
  // eslint-disable-next-line no-undef
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'react-journal')

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })
    if (resp.ok) {
      const cloudResp = await resp.json()
      return cloudResp.secure_url
    } else {
      throw await resp.json()
    }
  } catch (error) {
    throw new Error(error)
  }
}
