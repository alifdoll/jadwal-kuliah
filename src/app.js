class JadwalKuliah {
    static daftarHari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    static jadwalKeString(jadwal) {
        return `${jadwal.hari}, ${jadwal.waktuMulai} - ${jadwal.waktuBerakhir}`;
    }

    static stringWaktuKeTotalMenit(stringWaktu) {
        const jam = Number.parseInt(stringWaktu.substring(0, stringWaktu.indexOf('.')));
        const menit = Number.parseInt(stringWaktu.substring(stringWaktu.indexOf('.') + 1));
        return jam * 60 + menit;
    }

    static totalMenitKeStringWaktu(totalMenit) {
        const jam = Number.parseInt(totalMenit / 60).toString().padStart(2, '0');
        const menit = (totalMenit % 60).toString().padStart(2, '0');
        return `${jam}.${menit}`;
    }

    static jadwalBertabrakan(jadwal1, jadwal2) {
        if (jadwal1.hari !== jadwal2.hari) return false;
        const waktuMulaiJadwal1 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal1.waktuMulai);
        const waktuBerakhirJadwal1 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal1.waktuBerakhir);
        const waktuMulaiJadwal2 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal2.waktuMulai);
        const waktuBerakhirJadwal2 = JadwalKuliah.stringWaktuKeTotalMenit(jadwal2.waktuBerakhir);
        return !(waktuBerakhirJadwal2 <= waktuMulaiJadwal1 ? true : waktuMulaiJadwal2 >= waktuBerakhirJadwal1);
    }

    constructor(tabelMataKuliah, tabelJadwal, daftarMataKuliah, preferensi = null) {
        this.tabelMataKuliah = tabelMataKuliah;
        this.tabelJadwal = tabelJadwal;
        this.daftarMataKuliah = daftarMataKuliah;

        if (preferensi) {
            this.daftarKolom = preferensi.daftarKolom ? preferensi.daftarKolom : ['Kode', 'Nama', 'Kelas'];
        } else {
            this.daftarKolom = ['Kode', 'Nama', 'Kelas'];
        }

        this.jumlahKelasDipilih = 0;

        this.batasAwalHari = JadwalKuliah.daftarHari.indexOf(
            this.daftarMataKuliah[0].kelas[0].jadwal[0].hari
        );

        this.batasAkhirHari = JadwalKuliah.daftarHari.indexOf(
            this.daftarMataKuliah[0].kelas[0].jadwal[0].hari
        );

        this.batasAwalWaktu = JadwalKuliah.stringWaktuKeTotalMenit(
            this.daftarMataKuliah[0].kelas[0].jadwal[0].waktuMulai
        );

        this.batasAkhirWaktu = JadwalKuliah.stringWaktuKeTotalMenit(
            this.daftarMataKuliah[0].kelas[0].jadwal[0].waktuBerakhir
        );

        this.daftarMataKuliah.forEach((mataKuliah) => {
            mataKuliah.kelas.forEach((kelas) => {
                kelas.jadwal.forEach((jadwal) => {
                    const indexHari = JadwalKuliah.daftarHari.indexOf(jadwal.hari);
                    if (indexHari < this.batasAwalHari) {
                        this.batasAwalHari = indexHari;
                    }
                    if (indexHari > this.batasAkhirHari) {
                        this.batasAkhirHari = indexHari;
                    }

                    const totalMenitwaktuMulai = JadwalKuliah.stringWaktuKeTotalMenit(
                        jadwal.waktuMulai
                    );
                    if (totalMenitwaktuMulai < this.batasAwalWaktu) {
                        this.batasAwalWaktu = totalMenitwaktuMulai;
                    }

                    const totalMenitwaktuBerakhir = JadwalKuliah.stringWaktuKeTotalMenit(
                        jadwal.waktuBerakhir
                    );
                    if (totalMenitwaktuBerakhir > this.batasAkhirWaktu) {
                        this.batasAkhirWaktu = totalMenitwaktuBerakhir;
                    }
                });
            });
        });

        this.daftarHari = JadwalKuliah.daftarHari.slice(this.batasAwalHari, this.batasAkhirHari + 1);

        this.batasAwalWaktu = Number.parseInt(this.batasAwalWaktu / 60);
        if (this.batasAkhirWaktu % 60 === 0) {
            this.batasAkhirWaktu = (this.batasAkhirWaktu / 60) - 1;
        } else {
            this.batasAkhirWaktu = Number.parseInt(this.batasAkhirWaktu / 60);
        }

        this.tabelMataKuliah.createTHead();
        this.tabelMataKuliah.tHead.insertRow();
        this.daftarKolom.forEach((header) => {
            this.tabelMataKuliah.tHead.rows[0].appendChild(document.createElement('th'))
                .textContent = header;
        });

        this.tabelMataKuliah.createTBody();
        this.daftarMataKuliah.forEach((mataKuliah) => {
            const tr = this.tabelMataKuliah.tBodies[0].insertRow();
            this.daftarKolom.forEach((kolom) => {
                if (kolom.toLowerCase() === 'kelas') {
                    const divContainerKelas = tr.insertCell().appendChild(
                        document.createElement('div')
                    );
                    divContainerKelas.classList.add('container-kelas');
                    divContainerKelas.setAttribute('data-kode-mata-kuliah', mataKuliah.kode);
                    mataKuliah.kelas.forEach((kelas) => {
                        const divKelas = divContainerKelas.appendChild(
                            document.createElement('div')
                        );
                        divKelas.classList.add('kelas');
                        divKelas.addEventListener('click', () => {
                            this.clickKelas(mataKuliah.kode, kelas.kode);
                        });
                        const ulKelasBertabrakan = divKelas.appendChild(
                            document.createElement('ul')
                        );
                        ulKelasBertabrakan.classList.add('kelas__kelas-bertabrakan');
                        divKelas.appendChild(document.createElement('p')).textContent = kelas.kode;
                        divKelas.setAttribute('data-kode-kelas', kelas.kode);
                        kelas.jadwal.forEach((jadwal) => {
                            divKelas.appendChild(document.createElement('p')).textContent =
                                JadwalKuliah.jadwalKeString(jadwal);
                        });
                    });
                } else {
                    tr.insertCell().textContent = mataKuliah[kolom.toLowerCase()];
                }
            });
        });

        this.tabelJadwal.createTHead();
        this.tabelJadwal.tHead.insertRow().appendChild(document.createElement('th')).colSpan =
            this.daftarHari.length + 1;
        this.tabelJadwal.tHead.insertRow().appendChild(document.createElement('th')).textContent =
            'Waktu';
        this.daftarHari.forEach((hari) => {
            this.tabelJadwal.tHead.rows[1].appendChild(document.createElement('th')).textContent =
                hari;
        });

        this.tabelJadwal.createTBody();
        for (let i = this.batasAwalWaktu; i <= this.batasAkhirWaktu; i++) {
            const row = this.tabelJadwal.tBodies[0].insertRow();
            for (let i = 0; i <= this.daftarHari.length; i++) {
                row.insertCell();
            }
            row.firstChild.textContent = JadwalKuliah.totalMenitKeStringWaktu(i * 60);
        }
    }

    divKelas(kodeMataKuliah, kodeKelas) {
        return this.tabelMataKuliah.querySelector(
            `.container-kelas[data-kode-mata-kuliah='${kodeMataKuliah}'] .kelas[data-kode-kelas='${kodeKelas}']`
        );
    }

    clickKelas(kodeMataKuliah, kodeKelas) {
        const divKelas = this.divKelas(kodeMataKuliah, kodeKelas);
        if (divKelas.getAttribute('data-kelas-bertabrakan') === 'true') return;
        let kodeKelasDipilihSebelumnya = divKelas.parentElement.getAttribute('data-kode-kelas-dipilih');
        if (kodeKelasDipilihSebelumnya === kodeKelas) {
            this.batalPilihKelas(kodeMataKuliah, kodeKelas);
        } else {
            if (kodeKelasDipilihSebelumnya) {
                this.batalPilihKelas(kodeMataKuliah, kodeKelasDipilihSebelumnya);
            }
            this.pilihKelas(kodeMataKuliah, kodeKelas);
        }

        this.tabelJadwal.tHead.rows[0].firstChild.textContent =
            `Terpilih ${this.jumlahKelasDipilih}/${this.daftarMataKuliah.length} kelas`;
    }

    pilihKelas(kodeMataKuliah, kodeKelas) {
        this.jumlahKelasDipilih++;

        const mataKuliahDipilih = this.daftarMataKuliah.find((mataKuliah) =>
            mataKuliah.kode === kodeMataKuliah
        );
        const kelasDipilih = mataKuliahDipilih.kelas.find((kelas) =>
            kelas.kode === kodeKelas
        );

        const divKelas = this.divKelas(kodeMataKuliah, kodeKelas);
        divKelas.classList.add('kelas--dipilih');
        divKelas.parentElement.parentElement.parentElement.classList.add(
            'tr--kelas-telah-dipilih'
        );
        divKelas.parentElement.setAttribute('data-kode-kelas-dipilih', kodeKelas);

        this.daftarMataKuliah.forEach((mataKuliah) => {
            if (mataKuliah.kode === kodeMataKuliah) return;
            mataKuliah.kelas.forEach((kelas) => {
                for (let i = 0; i < kelas.jadwal.length; i++) {
                    for (let j = 0; j < kelasDipilih.jadwal.length; j++) {
                        if (JadwalKuliah.jadwalBertabrakan(
                            kelas.jadwal[i], kelasDipilih.jadwal[j]
                        )) {
                            const divKelas = this.divKelas(mataKuliah.kode, kelas.kode);
                            divKelas.setAttribute('data-kelas-bertabrakan', true);
                            const liPesan = divKelas.querySelector('.kelas__kelas-bertabrakan').appendChild(
                                document.createElement('li')
                            );
                            liPesan.innerHTML =
                                `<b>${mataKuliahDipilih.nama} (Kelas ${kodeKelas})</b> pada <b>${JadwalKuliah.jadwalKeString(kelasDipilih.jadwal[j])}</b>`;
                            liPesan.setAttribute(
                                'data-kode-mata-kuliah-bertabrakan', kodeMataKuliah
                            );
                            liPesan.setAttribute('data-kode-kelas-bertabrakan', kodeKelas);
                            liPesan.setAttribute('data-index-jadwal-bertabrakan', j);
                        }
                    }
                }
            });
        });

        kelasDipilih.jadwal.forEach((jadwal) => {
            const menitwaktuMulai = JadwalKuliah.stringWaktuKeTotalMenit(jadwal.waktuMulai);
            const menitwaktuBerakhir = JadwalKuliah.stringWaktuKeTotalMenit(jadwal.waktuBerakhir);
            const perbedaanWaktu = menitwaktuBerakhir - menitwaktuMulai;

            const divJadwal = this.tabelJadwal.tBodies[0].querySelector(
                `tr:nth-child(${Number.parseInt(menitwaktuMulai / 60) - this.batasAwalWaktu + 1})>td:nth-child(${this.daftarHari.indexOf(jadwal.hari) + 2})`
            ).appendChild(document.createElement('div'));
            divJadwal.classList.add('jadwal');
            divJadwal.style.height =
                `calc(${Number.parseInt(perbedaanWaktu / 60) * 4}rem + ${(perbedaanWaktu % 60) / 60 * 4}rem - 1px)`;
            divJadwal.style.marginTop =
                `calc(-2rem + ${(menitwaktuMulai % 60) / 60 * 4}rem + 1px)`;
            divJadwal.setAttribute('data-kode-mata-kuliah', kodeMataKuliah);
            divJadwal.setAttribute('data-kode-kelas', kodeKelas);

            const divInformasiJadwal = divJadwal.appendChild(document.createElement('div'));
            divInformasiJadwal.classList.add('jadwal__detail');
            divInformasiJadwal.appendChild(document.createElement('p')).textContent =
                mataKuliahDipilih.nama;
            divInformasiJadwal.appendChild(document.createElement('p')).textContent =
                `Kelas ${kodeKelas}`;
            divInformasiJadwal.appendChild(document.createElement('p')).textContent =
                `${jadwal.waktuMulai} - ${jadwal.waktuBerakhir}`;
        });
    }

    batalPilihKelas(kodeMataKuliah, kodeKelas) {
        this.jumlahKelasDipilih--;

        const divKelas = this.divKelas(kodeMataKuliah, kodeKelas);
        divKelas.classList.remove('kelas--dipilih');
        divKelas.parentElement.removeAttribute('data-kode-kelas-dipilih');
        divKelas.parentElement.parentElement.parentElement.classList.remove(
            'tr--kelas-telah-dipilih'
        );

        this.tabelMataKuliah
            .querySelectorAll(
                `.kelas__kelas-bertabrakan li[data-kode-mata-kuliah-bertabrakan='${kodeMataKuliah}'][data-kode-kelas-bertabrakan='${kodeKelas}']`
            ).forEach((el) => {
                el.remove();
            });
        this.tabelMataKuliah
            .querySelectorAll('.kelas__kelas-bertabrakan')
            .forEach((el) => {
                if (el.childElementCount === 0) {
                    el.parentElement.setAttribute('data-kelas-bertabrakan', false);
                }
            });

        this.tabelJadwal
            .querySelectorAll(
                `.jadwal[data-kode-mata-kuliah='${kodeMataKuliah}'][data-kode-kelas='${kodeKelas}']`
            )
            .forEach((el) => {
                el.remove();
            });
    }
}
