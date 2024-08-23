import React, { useState } from "react";
import axios from "axios";
function Popup() {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenTerms, setIsOpenTerms] = useState(false);
  const [checked, setChecked] = useState(false);
  const [Mail, setMail] = useState("");
  const [vMail, setVMail] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const togglePopupTerms = () => {
    setIsOpenTerms(!isOpenTerms);
  };
  const submit = async (e) => {
    e.preventDefault();
    // try {
    //   const User = { Mail };
    //   let userResponse = await axios.post("https://anne-gpt-api.vercel.app/Mail", User);
    // } catch (err) {

    //   // setError(err.response.data.hata)
    // }
    localStorage.setItem("validate", true);
    togglePopup();
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="py-4 text-left px-6">
              <form className="form mt-3" onSubmit={submit}>
                {/* <input
                  type="email"
                  placeholder={"E Mail Adresiniz"}
                  onChange={(e) => setMail(e.target.value)}

                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                /> */}
                <div className="p-2 text-sm">
                  Anne Ai ’ya hoş geldiniz! Anne Ai’dan yararlanmayı tercih etmeniz halinde
                  kişisel verileriniz, MediaMarkt tarafından
                  <a
                    className="underline font-bold cursor-pointer mx-2"
                    onClick={togglePopupTerms}
                  >
                    ChatBot Aydınlatma Metni
                  </a>
                  kapsamında işlenecektir. Anne Ai ’yı
                  kullanmayı tercih etmemeniz halinde www.mediamarkt.com.tr
                  adresi üzerinden veya çağrı merkezimiz üzerinden bizimle
                  iletişime geçebilirsiniz.
                </div>
                <div className="flex mt-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                  <div className="flex text-sm">
                    <div className="ml-4">
                      {" "}
                      Müşteri İşlem bilgilerimin Anne Ai ’ın yapay zekâ teknolojisi aracılığıyla sunulması
                      amacıyla hizmet alınan yurt dışında mukim OpenAI OpCo,
                      LLC’ye aktarılmasını kabul ediyorum.
                    </div>
                    {/* <div className='ml-3 underline font-semibold cursor-pointer' onClick={togglePopupTerms}>Aydınlatma metinini </div> */}
                    {/* <div className='ml-1'>onaylıyorum.</div> */}
                  </div>
                </div>
                <div className=" flex justify-center mt-4">
                  <button
                    type="submit"
                    // disabled={!checked || !Mail.includes('@')}
                    disabled={!checked}
                    className={`py-2 px-4 ${
                      checked ? "bg-red-150" : "bg-gray-400"
                    } || ${
                      Mail.includes("@") ? "bg-red-150" : "bg-gray-400"
                    } text-white rounded`}
                  >
                    Kabul Ediyorum
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isOpenTerms && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="py-4 text-left px-6">
              <div
                className="mt-3"
                style={{ overflow: "auto", height: "300px" }}
              >
                <div className="flex justify-between items-center pb-3">
                  <div className="font-semibold">
                    YAPAY ZEKA DESTEKLİ CHAT UYGULAMASI AYDINLATMA METNİ
                  </div>
                  <button
                    onClick={togglePopupTerms}
                    className="text-gray-500 hover:text-gray-400 focus:outline-none "
                  >
                    <svg
                      className="h-6 w-6 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.646 5.646a.5.5 0 0 1 .708 0L12 11.293l5.646-5.647a.5.5 0 0 1 .708.708L12.707 12l5.647 5.646a.5.5 0 0 1-.708.708L12 12.707l-5.646 5.647a.5.5 0 0 1-.708-.708L11.293 12 5.646 6.354a.5.5 0 0 1 0-.708z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-2 underline font-semibold">
                  Veri Sorumlusu
                </div>
                <div>
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”)
                  uyarınca, kişisel verileriniz; veri sorumlusu sıfatını haiz,
                  Yeşilçe Mahallesi, Eski Büyükdere Caddesi, No:65/1,
                  Kağıthane/İstanbul adresinde mukim Media Markt Turkey Ticaret
                  Limited Şirketi (“Media Markt”) tarafından aşağıda belirtilen
                  amaçlar doğrultusunda ve hukuki sebeplere dayalı olarak, Kanun
                  kapsamda belirtilen sınırlar içerisinde işlenmektedir.
                </div>
                <div className="mt-2 underline font-semibold">
                  Kişisel Verilerin Hangi Amaçlarla ve Hukuki Sebeplerle
                  İşleneceği
                </div>
                <div>
                  Toplanan kişisel verileriniz, aşağıdaki amaçlarla (“Amaçlar”)
                  Kanun’un 5. maddesinde belirtilen kişisel veri işleme şartları
                  dahilinde web sitemiz üzerindeki yapay zeka tabanlı chat
                  uygulamalarını (“Chat Uygulaması”) kullanımınız sırasında
                  işlenebilecektir:
                </div>
                <div className="mt-2  font-semibold">Veri Kategorileri</div>
                <div>
                  · İletişim (özellikle Chat Uygulaması kullanımız esnasındaki
                  şehir bilginiz),
                </div>
                <div>
                  · Müşteri İşlem (özellikle Chat Uygulaması yazılan sorular ve
                  alınan yanıt bilgileri, Chat Uygulaması ile olan etkileşim
                  sayısı ve süresi, aranan ürün ve ürün kategorileri),
                </div>
                <div>· Cinsiyet</div>
                <div>· İşlem Güvenliği</div>
                <div className="mt-2  font-semibold">
                  Kişisel Verilerinizin İşlenme Amaçları
                </div>
                <div>
                  · Mal/hizmet satım süreçlerinin yürütülmesi bu kapsamda Chat
                  Uygulaması üzerinden yapılan yazışmalar uyarınca ürün ve
                  hizmet önerileri oluşturulması
                </div>
                <div>
                  · Chat Uygulaması’nın tarafınıza sunulması bu kapsamda görüşme
                  üzerinden ilettiğiniz sorularınız ve taleplerinizin alınması
                  ve yanıtlanması
                </div>
                <div>· Müşteri destek hizmeti süreçlerinin yönetilmesi</div>
                <div>
                  · Chat Uygulaması üzerinden gerçekleştirilen süreçlerin bilgi
                  güvenliğinin
                </div>
                <div>
                  · Şirketimizin ticari ve iş stratejilerinin belirlenmesi
                  kapsamında Chat Uygulaması’nın müşterilerimizce kullanımının
                  analiz edilmesi ve istatistik bilgileri toplanması
                </div>
                <div>
                  ·İleride meydana gelmesi muhtemel olası uyuşmazlıklarda delil
                  teşkil etmesi amacıyla
                </div>
                <div>
                  · Resmi kurum taleplerinin yerine getirilmesi amacıyla kimlik,
                  iletişim ve müşteri işlem verileriniz
                </div>
                <div>
                  · Yetkili kuruluşlara mevzuattan kaynaklı bilgi verilmesi
                  amacıyla
                </div>
                <div>
                  · Mevzuatta öngörülen saklama yükümlülüklerine uygunluğun
                  sağlanması
                </div>

                <div className="mt-2  font-semibold">
                  Kişisel Verilerinizin İşlenmesinde Dayanılan Hukuki Sebepler
                </div>
                <div>
                  · Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya
                  ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel
                  verilerin işlenmesinin gerekli olması.
                </div>
                <div>
                  · İlgili kişinin temel hak ve özgürlüklerine zarar vermemek
                  kaydıyla, veri sorumlusunun meşru menfaatleri için veri
                  işlenmesinin zorunlu olması
                </div>
                <div>
                  · Bir hakkın tesisi kullanılması veya korunması için veri
                  işlemenin zorunlu olması
                </div>
                <div>
                  · Kanunlarda açıkça öngörülmesi ve veri sorumlusunun hukuki
                  yükümlülüğünü yerine getirebilmesi için zorunlu olması
                </div>
                <div className="mt-2  font-semibold">
                  İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla
                  Aktarılabileceği
                </div>
                <div>
                  Chat Uygulaması’nın kullanımı esnasında elde edilen ve
                  yukarıda detaylandırılan kişisel verileriniz, meşru
                  menfaatlerimiz kapsamında Chat Uygulaması’nın teknik
                  altyapısının sağlanması konusunda hizmet aldığımız
                  tedarikçilerimize; kanunlarda açıkça öngörülmesi ve hukuki
                  yükümlülüklerimizin yerine getirilmesi kapsamında kanunen
                  yetkili kamu kurumlarına ve kanunen yetkili özel kişilere ve
                  açık rızanız kapsamında müşteri işlem verileriniz Chat
                  Uygulaması hizmetlerinin sizlere yapay zeka teknolojisi
                  aracılığıyla sunulması amacıyla hizmet alınan yurt dışında
                  mukim OpenAI OpCo, LLC’ye Kanun’un 5. maddesinde düzenlenen
                  veri işleme şartları kapsamında Kanun’un 8. ve 9. maddelerinde
                  belirtilen kişisel verilerin aktarılmasına ilişkin kurallara
                  uygun olarak aktarılabilecektir.
                </div>
                <div className="mt-2  font-semibold">
                  Kişisel Veri Toplamanın Yöntemi
                </div>
                <div>
                  Kişisel verileriniz, yukarıda yer verilen Amaçlar’ın yerine
                  getirilmesi kapsamında elektronik ortamda internet sitemiz,
                  Chat Uygulaması, Google Analytics çerezlerinin kullanımı
                  vasıtasıyla toplanmaktadır.
                </div>
                <div className="mt-2  font-semibold">
                  İlgili Kişinin Kanun’un 11. Maddesinde Sayılan Hakları
                </div>
                <div>
                  Kişisel verilerinize ilişkin olarak Kanun’un 11. maddesi
                  uyarınca aşağıdaki haklara sahip olduğunuzu bildiririz:
                </div>
                <div>
                  · Kişisel verilerinizin işlenip işlenmediğini öğrenme,
                </div>
                <div>
                  · Kişisel verileriniz işlenmişse buna ilişkin bilgi talep
                  etme,
                </div>
                <div>
                  · Kişisel verilerinizin işlenme amacını ve bunların amacına
                  uygun kullanılıp kullanılmadığını öğrenme,
                </div>
                <div>
                  · Yurt içinde veya yurt dışında kişisel verilerinizin
                  aktarıldığı üçüncü kişileri bilme,
                </div>
                <div>
                  · Kişisel verilerinizin eksik veya yanlış işlenmiş olması
                  hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan
                  işlemin kişisel verilerinizin aktarıldığı üçüncü kişilere
                  bildirilmesini isteme,
                </div>
                <div>
                  · Kanun ve ilgili diğer kanun hükümlerine uygun olarak
                  işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin
                  ortadan kalkması hâlinde kişisel verilerinizin silinmesini
                  veya yok edilmesini isteme ve bu kapsamda yapılan işlemin
                  kişisel verilerinizin aktarıldığı üçüncü kişilere
                  bildirilmesini isteme,
                </div>
                <div>
                  · İşlenen verilerinizin münhasıran otomatik sistemler
                  vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun
                  ortaya çıkmasına itiraz etme,
                </div>
                <div>
                  · Kişisel verilerinizin kanuna aykırı olarak işlenmesi
                  sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep
                  etme.
                </div>
                <div className="mt-2">
                  {" "}
                  Yukarıda sıralanan haklarınıza yönelik başvurularınızı,
                  https://www.mediamarkt.com.tr/tr/shop/veri-sahibi-basvuru-formu.html’den
                  ulaşabileceğiniz Media Markt Turkey Ticaret Limited Şirketi
                  Veri Sahibi Başvuru Formu’nu doldurarak Şirketimize
                  iletebilirsiniz. Talebinizin niteliğine göre en kısa sürede ve
                  en geç 30 (otuz) gün içinde başvurularınız ücretsiz olarak
                  sonuçlandırılacaktır; ancak işlemin ayrıca bir maliyet
                  gerektirmesi halinde Kişisel Verileri Koruma Kurulu tarafından
                  belirlenecek tarifeye göre tarafınızdan ücret talep
                  edilebilecektir.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
