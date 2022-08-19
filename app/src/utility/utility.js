const isLiked = (favoriteServices, serviceId) => {
  favoriteServices.forEach((service) => {
    if (service.toString() === serviceId.toString()) return true
    else return false
  })
}
export default isLiked
