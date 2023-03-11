<template>
  <v-app v-resize="onResize" dark>
    <AppBar></AppBar>
    <v-main>
      <Nuxt />
      <v-footer
        class="footerStyle"
        style="max-width: 100vw !important; overflow: hidden"
        padless
      >
        <!-- logo ve social media -->
        <v-col
          class="d-flex flex-column align-center"
          :cols="currentWidth < 940 ? '12' : '4'"
        >
          <!-- logo -->
          <v-img
            contain
            max-width="50%"
            :src="require('static/logo-cultrav.svg')"
          ></v-img>
          <!-- social media -->
          <v-row class="ma-0 pa-0">
            <a
              style="text-decoration: none"
              href="https://www.facebook.com/people/Cultrav-TR/100083558941175/"
              target="_blank"
            >
              <v-img
                max-width="30px"
                class="mx-1"
                contain
                :src="require('static/social-media/Facebook.svg')"
              ></v-img>
            </a>
            <a
              style="text-decoration: none"
              href="https://twitter.com/cultrav_tr"
              target="_blank"
            >
              <v-img
                max-width="30px"
                class="mx-1"
                contain
                :src="require('static/social-media/Twitter.svg')"
              ></v-img>
            </a>
            <a
              style="text-decoration: none"
              href="https://www.instagram.com/cultrav.tr"
              target="_blank"
            >
              <v-img
                max-width="30px"
                class="mx-1"
                contain
                :src="require('static/social-media/Instagram.svg')"
              ></v-img>
            </a>
            <a
              style="text-decoration: none"
              href="https://www.linkedin.com/company/cultrav/"
              target="_blank"
            >
              <v-img
                max-width="30px"
                class="mx-1"
                contain
                :src="require('static/social-media/LinkedIn.svg')"
              ></v-img>
            </a>
            <a
              style="text-decoration: none"
              href="https://www.tiktok.com/@cultrav"
              target="_blank"
            >
              <v-img
                max-width="30px"
                class="mx-1"
                contain
                :src="require('static/social-media/Tiktok.svg')"
              ></v-img>
            </a>
          </v-row>
        </v-col>

        <v-col
          class="d-flex justify-start"
          :cols="currentWidth < 940 ? '12' : '8'"
        >
          <!-- mobil uygulama -->
          <div
            class="ma-0 mx-3 pa-0"
            :style="currentWidth < 940 ? { width: '100%' } : ''"
          >
            <v-card-text
              class="footerTextStyle"
              :class="currentWidth < 940 ? 'text-center' : ''"
              >Mobil Uygulama</v-card-text
            >

            <!-- mobil uygulama indirme linkleri -->
            <div
              class="ma-0 pa-0"
              :class="currentWidth < 940 ? 'd-flex justify-center' : ''"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.cultrav&gl=TR"
                target="_blank"
              >
                <v-img
                  contain
                  max-width="90%"
                  :src="require('static/google-play.svg')"
                ></v-img>
              </a>

              <a
                href="https://apps.apple.com/tr/app/cultrav/id1622312242?l=tr"
                target="_blank"
              >
                <v-img
                  contain
                  :class="currentWidth < 940 ? 'mt-0' : 'mt-2'"
                  max-width="90%"
                  :src="require('static/app-store.svg')"
                ></v-img>
              </a>
            </div>
          </div>

          <div v-if="this.currentWidth > 940" class="ma-0 mx-3 pa-0">
            <a style="text-decoration: none" href="/aboutUs">
              <v-card-text class="footerTextStyle">Hakkımızda</v-card-text>
            </a>
          </div>
          <div v-if="this.currentWidth > 940" class="ma-0 mx-3 pa-0">
            <a style="text-decoration: none" href="/blog">
              <v-card-text class="footerTextStyle">Blog</v-card-text>
            </a>
          </div>
          <!-- <div v-if="this.currentWidth > 940" class="ma-0 mx-3 pa-0">
            <a style="text-decoration: none">
              <v-card-text class="footerTextStyle">Bize Ulaşın</v-card-text>
            </a>
          </div> -->
          <div v-if="this.currentWidth > 940" class="ma-0 mx-3 pa-0">
            <a style="text-decoration: none" @click="privacyDialog = true">
              <v-card-text class="footerTextStyle"
                >Gizlilik Sözleşmesi</v-card-text
              >
            </a>
          </div>

          <!-- privacy dialog -->
          <v-dialog width="75vw" v-model="privacyDialog">
            <v-card>
              <v-row
                class="ma-0 pa-0 d-flex justify-end"
                style="
                  width: 100%;
                  padding-right: 2% !important;
                  padding-top: 2% !important;
                "
              >
                <v-icon @click="privacyDialog = false">
                  mdi-close</v-icon
                ></v-row
              >
              <v-card-title class="privacyPolicyTitle"
                >CULTRAV UYGULAMASI KAPSAMINDA KİŞİSEL VERİLERİN İŞLENMESİNE
                İLİŞKİN AYDINLATMA METNİ</v-card-title
              >
              <v-card-text class="privacyPolicyText">{{
                privacyPolicy
              }}</v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentWidth: '',
      privacyDialog: false,
      privacyPolicy:
        'Bu metin, kişisel verilerinizin işlenmesi konusunda 6698 sayılı Kişisel Verilerin Korunması Kanunun (“Kanun”) 10. maddesi çerçevesinde aydınlatılmanızı sağlamak amacıyla hazırlanmıştır.\r\nCULTRAV,tarafınızdan elde edilen kişisel veriler bakımından, Kanun uyarınca veri sorumlusu sıfatına haiz olup işbu Aydınlatma Metni ile söz konusu Kanun uyarınca CULTRAV Uygulaması bağlamında CULTRAV tarafından gerçekleştirilen kişisel veri işleme faaliyetleri hakkında işbu metni okuyan ve kabul eden veri sahiplerinin (“Veri Sahibi”) aydınlatılması ve aşağıda belirtilen durumlar için açık rızalarının temini hedeflenmektedir.\r\n1. KİŞİSEL VERİLERİNİZİN İŞLENME AMAÇLARI\r\nCULTRAV, Uygulama’ya giriş yapmanız sırasında ve/veya sonrasında; Uygulama üzerinden (ad/soyad,E-posta adresi, adres bilgileri) kayıt olarak paylaştığınız kişisel verilerinizi aşağıda sıralanan amaçlarla; 6698 sayılı Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dâhilinde işleyebilecektir.\r\nKişisel verilerinizin işleme amaçları;\r\n-	 Uygulama üzerinden yararlanmak istediğiniz, talep ettiğiniz ürün ve hizmeti sunmak,\r\n-	 Size uygun avantajlı üyelik, kampanya, hizmet ve ürünlerin hızlı ve en doğru şekilde belirlenmesi gibi olanaklar sağlamak ve tarafınızın kullanımına sunmak için gerekli her türlü işlemi yerine getirmek,\r\n-	 Uygulama tarafından sunulan diğer ürün ve hizmetlerin beğenileriniz, kullanım alışkanlıklarınız ve ihtiyaçlarınıza göre özelleştirilerek sizlere önermek bunları raporlamak,\r\n-	 Sunulan ürün ve hizmetlere ilişkin destek vermek,,\r\n-	 Uygulama üzerindeki analitik verilerin size daha iyi hizmet verebilmek adına izlenmesi,\r\n-	 CULTRAV Mobil sponsorlarına, destekçilerine, iş ortaklarına ve anlaşmalı kurumlarına ilişkin içerikler, ürünler, olanaklar ve yenilikler hakkında tarafınızı haberdar etmek,\r\n-	 Ürün ve hizmetlerimizi geliştirmek, yönetim ve iletişim faaliyetlerini ve stratejilerini doğru olarak planlamak, yürütmek ve yönetmek,\r\n-	 Hizmetlerin iyileştirilmesi için bilgiler ifşa edilmeden istatistiksel çalışmalarla değerlendirilerek analiz yapmak,\r\n-	 Uygulamada oluşan hataları gidermek,\r\n-	 Talep edeceğiniz bilgi, etkinlik ve hizmetlerle ilgili tarafınızı bilgilendirmek ve talep veya şikâyetlerinizi yönetmek, yerine getirmek,\r\n-	 Uygulama tarafından muhafaza edilen kişisel verilerinizin güvenliğinin teminini sağlamak ve bu amaçla verilerinizi muhafaza etmek üzere aktarmak,\r\n-	 Veri kayıplarının önlenebilmesi için kopyalama/yedekleme yapmak,\r\n-	 Yasal düzenlemelerin gerektirdiği veya zorunlu kıldığı şekilde, yasal yükümlülüklerin yerine getirilmesinin sağlamak,\r\n-	 KVKK’da belirtilen mevzuata uygun olmak şartı ile diğer amaçlarla işlenmektedir.\r\n\r\nÜyelerimize her türlü ürün ve hizmetlere ilişkin tanıtım, hizmet, servis, reklam, iletişim, promosyon, Satış ve pazarlama amacıyla, üyelik bilgilendirme, işlem, uygulamaları için CULTRAV tarafından anlık bildirim, e-posta/mail ile sosyal ve ticari iletişimler yapılabilir, kullanıcılarımıza ticari elektronik iletiler gönderebiliriz.\r\nKişisel verileriniz hukuka ve dürüstlük kurallarına uygun ve belirli, açık ve meşru amaçlar için işlenmekte, doğru ve gerektikçe güncel tutulmakta, işlendikleri amaçla bağlantılı, sınırlı ve ölçülü kullanılmakta ve hukuka uygun olarak belirlenen saklama süresi boyunca muhafaza edilmektedir. \r\n\r\n2. KİŞİSEL VERİLERİNİZİN TOPLANMA YÖNTEMİ VE HUKUKİ SEBEBİ\r\nKişisel verileriniz Uygulama içerisinde kayıt işlemi sonrası toplanmaktadır. İşbu bilgilendirmede belirtilen yöntemlerle toplanan verilerinizin toplanmasında dayanılan hukuki sebepler, verinin niteliğine uygun olarak Kanun’un 5. ve 6. maddelerinde ve işbu Aydınlatma Metni’nde belirtilen amaçlarla, sözleşmenin ifası için veri işlemenin zorunlu olması, hukuki yükümlülüklerimizin yerine getirilebilmesi için zorunlu olması, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması sebeplerinden biri uyarınca işlenir.\r\n3. KİŞİSEL VERİLERİNİZİN SAKLANMASI\r\nKişisel verileriniz merkezi Hollanda’da bulunan ‘’HOSTINGER’’ tarafından bulut ortamda saklanmaktadır. Kişisel verileriniz işlenme amaçlarının gerektirdiği süreler boyunca saklanabilmektedir. İşlenme amacımız ortadan kalktıktan sonra saklamak için herhangi bir hukuki sebep olmaması halinde kişisel verileriniz silinmekte veya yok edilmektedir.\r\n\r\n4. KİŞİSEL VERİLERİNİZİN GÜVENLİĞİ\r\nKişisel verilerinizin hukuka uygun olarak işlenmesini ve güvenli şekilde saklanmasını sağlamak ve kişisel verilerinize hukuka aykırı olarak erişilmesini önlemek amacıyla, CULTRAV uygun güvenlik düzeyini sağlamak için gereken her türlü teknik ve idari tedbirleri almaktadır.\r\n5. KİŞİSEL VERİ SAHİBİ OLARAK KULLANICI HAKLARI\r\n5.1 Uygulama üzerinden ilgili bağlantıyı kullanarak;\r\n-	 Kişisel verilerinizin işlenip işlenmediğini öğrenme,\r\n-	 Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,\r\n-	 Kişisel verilerinizin işlenme amacını ve kişisel verilerinizin işlenme amacına uygun kullanılıp kullanılmadığını öğrenme,\r\n-	 Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini talep etme,\r\n-	 İlgili mevzuatta öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,\r\n-	 İşlenen kişisel verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle sizin aleyhinize bir sonucun ortaya çıkmasına itiraz etme,\r\n-	 Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde, zararın giderilmesini talep etme, haklarına sahipsiziniz.\r\n5.2 Başvurunuzu uygulama üzerinden ilgili bağlantıyı kullanarak gerçekleştirebilirsiniz. Başvuru sonrası 10(on) iş günü içerisinde sonuçlanacaktır.\r\n\r\n',
    }
  },
  async created() {},
  methods: {
    onResize() {
      this.currentWidth = window.innerWidth
    },
  },
}
</script>

<style>
html {
  overflow: auto;
  overflow-x: hidden;
}

.footerStyle {
  background-image: linear-gradient(
    to right,
    #ff914d,
    #ff9d74,
    #ffac9b,
    #ffbec1
  ) !important;
}

.footerTextStyle {
  color: white;
}

.privacyPolicyTitle {
  word-break: break-word;
  text-align: center;
  font-size: 1.5em !important;
}

.privacyPolicyText {
  word-break: break-word;
  white-space: break-spaces;
}
</style>
