const nodemailer = require('nodemailer')

const sendMailController = {
    send: async (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lucnguyendinh202@gmail.com',
                pass: 'buwo pdrx gfzx swri',
            },
        })

        const images = [
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709004/img/53486ce0-d03d-4922-aad0-39a5b6f8b185_rbxjgp.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709003/img/295e19c4-c245-4071-a870-881a8c050e98_i7hyxu.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709004/img/b9b0b86f-2296-4a42-902d-4f2966a244ed_vutofw.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709003/img/955df8dd-bbb7-4ce8-9c5e-b41a4cc70209_wz1ep0.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709002/img/22e36d69-ee21-4695-80b7-bb74224e76b9_rjarbl.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709005/img/d583b35b-5435-45d0-8727-a0461bbd0eca_l0gpil.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709003/img/c4db5144-99b2-4842-86fc-b2f347c08dc4_p4lqbm.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709004/img/51f717ff-e6e8-48e4-852d-acf2fdc1e8a1_odygog.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709005/img/5f70a5b6-a214-4230-b763-876be9232f87_e0kjed.jpg',
            'https://res.cloudinary.com/dn7tkpnp3/image/upload/v1720709003/img/17dcee52-e931-4072-bef4-67c46bab4a87_fmynbp.jpg',
        ]

        let mailOptions = {
            from: 'lucnguyendinh202@gmail.com',
            to: 'ngottha110@gmail.com',
            subject: 'Gửi công chúa của anhhhh!!!',
            html: `<link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
              
              <div style="max-width: 662px; margin: 0 auto; background-color: #FFE4E1; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="background: linear-gradient(to right, #ff5f6d, #ffc371); color: #333; text-align: center; padding: 20px;">
                  <img width="36" height="36" src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/hinh-nen-tinh-yeu-2.jpg" alt="Love" style="vertical-align: middle; margin-right: 10px;border-radius: 50%;">
                  <span style="font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 600;">Thư từ bạn Nực!!!</span>
                </div>
                <div style="background-color: #FFE4E1; padding: 48px;color: #008000;">
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 18px; font-weight: 600; line-height: 1.5; margin: 0 0 24px;">Chào Ngô Thị Thu Hà,</p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Chào em, cô công chúa của anh!<br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Từ ngày em bước vào cuộc đời anh, mọi thứ trở lên đều tuyệt vời và ý nghĩa hơn bao giờ hết. Em là người bạn, người yêu, người tri kỉ, người tâm sự, em là ánh sáng soi sáng con đường anh đi, là niềm vui khi anh gặp khó khăn, là mục tiêu để anh cố gắng. Chỉ cần em bên cạnh anh, anh cảm thấy mình có thể vượt qua tất cả.<br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Mỗi khoảng khắc bên em đều tràn đầy tình yêu thương và hạnh phúc. Anh yêu nụ cười của em. Yêu cách em quan tâm chăm sóc. Em là điều tuyệt vời nhất đã đến bên anh.<br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Anh biết anh vẫn còn là trẻ con. Anh muốn trân thành xin lỗi em vì những hành động, lời nói không đáng có của anh. Anh nghĩ mình thật trẻ con và không suy nghĩ thấu đáo, điều đó đã làm tổn thương em và làm em buồn. Anh thực sự hối hận vì điều đó.<br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Anh hiểu rằng trong mối quan hệ của chúng ta, sự tôn trọng và thấu hiểu là rất quan trọng. Anh để không thể hiện được điều đó khiến em không đang phải chịu đựng những điều đó. Anh thật lòng xin lỗi vì đã khiến em phiền lòng.<br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Anh mong rằng em có thể tha thứ cho anh và cho anh cơ hội để anh sửa chữa lỗi lầm của mình. Anh hứa sẽ cố gắng trưởng thành hơn, lắng nghe em nhiều hơn và kiểm soát cảm xúc của mình tốt hơn. Em là người quan trọng nhất đối với anh, và anh không muốn mất đi em vì những ngu ngốc của mình.<br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Một lần nữa, anh hi vọng và xin lỗi em sẽ tha thứ cho anh.
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 400; line-height: 1.5; margin: 24px 0 24px;">
                    Yêu em, <br/>
                  </p>
                  <p style="font-family: 'Be Vietnam Pro', sans-serif; font-size: 16px; font-weight: 700; line-height: 1.5; margin: 24px 0 24px; text-align: right;">
                    <span style="margin-right: 42px;">Lực</span> <br/> Nguyễn Đình Lực
                  </p>
                  <div >
                  ${images
                      .map((image, index) => {
                          return `<img src="${image}" alt="Image ${
                              index + 1
                          }" style="width: 19.2%; height: auto; border-radius: 10px; object-fit: cover;">`
                      })
                      .join('')}
                  </div>
                </div>
                <div style="background-color: #FFE4E1;font-family: 'Be Vietnam Pro', sans-serif; font-size: 12px; font-weight: 400; line-height: 1.5; text-align: center; color: #adaeba; padding: 24px">
                  Copyright © 2024 LucNguyen. All rights reserved.
                </div>
              </div>`,
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                return res.status(500).json(error)
            } else {
                return res.status(200).json('Email sent: ' + info.response)
            }
        })
    },
}

module.exports = sendMailController
