import { Link } from 'react-router-dom';
import { socialMedia } from '../../assets/constants';
import logo from '../../assets/logo.png';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="container my-24 md:my-8 pt-8 border-t-2">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1 flex flex-col justify-center md:justify-start items-center md:items-start gap-4">
          <Link to="/" className="flex gap-2 items-center">
            <img src={logo} className="w-12 h-12" />
            <h1>UMKM DIGITAL BLOCKCHAIN</h1>
          </Link>
          <p className="text-center md:text-left">
            Address : DOKTER MOCHAMMAD HATTA NO.23 RT 005 RW. 002 NAGARASARI,CIPEDES KOTA TASIKMALAYA JAWA BARAT
          </p>
          <div className="flex gap-4">
            {socialMedia.map((item, index) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}>
                <img className="w-8" src={item.name} alt={item.name} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 font-light justify-center md:justify-start items-center">
          <h2 className="font-bold">Perusahaan</h2>
          <p className="hover:text-primary cursor-pointer">Tentang kami</p>
          <p className="hover:text-primary cursor-pointer">Kebijakan Privasi</p>
          <p className="hover:text-primary cursor-pointer">
            Persyaratan Layanan
          </p>
        </div>
        <div className="flex-1 flex flex-col gap-2 font-light justify-center md:justify-start items-center md:items-end">
          <h2 className="font-bold">Bantuan</h2>
          <p className="hover:text-primary cursor-pointer"><a href='https://api.whatsapp.com/send?phone=6282221010103&text=Hallo, Saya ingin bertanya lebih lanjut tentang UMKM Digital Blockchain'>Hubungi admin</a></p>
          <p className="hover:text-primary cursor-pointer">Cara Pemesanan</p>
          <p className="hover:text-primary cursor-pointer">FAQ</p>
        </div>
      </div>
      <p className="text-center pt-8 border-t">
        Copyright © {date} UMKM DIGITAL BLOCKCHAIN All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
