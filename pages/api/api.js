export default function miapi(req, res) {
    res.status(200).json(
        {
            text: [
                {
                    titulo: "Welcome!",
                }
   
            ]
      }
    )
  }