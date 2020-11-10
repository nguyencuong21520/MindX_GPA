const controller = {
  control: async()=>{
    await controller.getData()
    view.showTimer()
    let a = model.currentTem
    console.log(a)
  },
  getData: async () => {
    let result = await firebase.firestore()
      .collection('p1')
      .get()
    let data = utils.getDataFromDocs(result.docs)
    await model.saveListTeam(data)
    console.log(model.listTeam)
  },
}