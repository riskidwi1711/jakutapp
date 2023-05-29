import Card from "@/Components/Card/Card";
import Checkbox from "@/Components/Checkbox";
import FilterData from "@/Components/Filter/FilterData";
import SearchData from "@/Components/Filter/SearchData";
import PageTitle from "@/Components/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function Absen(props) {
  const [data, setData] = useState(props.data);
  const [list, setList] = useState(props.data);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => li.id.toString()));
    if (isCheckAll) {
      setIsCheck([]);
    }

    console.log(isCheck);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }

    console.log(isCheck);
  };

  const handleSearch = (text) => {
    setIsSearch(true);
    let filteredData = props.data;
    filteredData = data.filter((item) => {
      let nama = item.nama.toString();
      let email = item.no_handphone.toString();
      let kode = item.kode_acara.toString();
      return nama.includes(text) || email.includes(text) || kode.includes(text);
    });
    if (text === "init") {
      setIsSearch(false);
      setFilteredData(props.data);
    } else {
      setFilteredData(filteredData);
    }
  };

  const handleNext = (text) => {
    if (isSearch) {
      let filteredDatas = filteredData;
      filteredDatas = data.filter((item) => {
        let alamat = item.alamat.toString().toLowerCase();
        return alamat.includes(text.toLowerCase());
      });
      setFilteredData(filteredDatas);
    }
  };

  const handleAdd = async (isCheck) => {
    const { value: formValues } = await Swal.fire({
      title: "Pilih jenis kategori",
      html: '<div class="d-flex flex-column align-items-start"><div><input id="swal-input1" value="1" type="checkbox"> Korsak</input></div><div><input id="swal-input2" value="1" type="checkbox"> Korte</input></div><div><input id="swal-input3" value="1" type="checkbox"> Korwe</input></div><div><input id="swal-input4" value="1" type="checkbox"> Saksi</input></div><div><input id="swal-input5" value="1" type="checkbox"> Tokoh</input></div></div>',
      focusConfirm: false,
      confirmButtonText: "Simpan",
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").checked &&
            document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").checked &&
            document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").checked &&
            document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").checked &&
            document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").checked &&
            document.getElementById("swal-input5").value,
        ];
      },
    });

    if (formValues) {
      console.log({
        data: isCheck,
        kategori: formValues,
      });
    }
  };

  let columns = [
    {
      name: (
        <Checkbox
          type="checkbox"
          name="selectAll"
          id="selectAll"
          handleClick={handleSelectAll}
          isChecked={isCheckAll}
        />
      ),
      width: "5%",
      selector: (row) => (
        <input
          type="checkbox"
          name={row.nama}
          id={row.id}
          value={row.id}
          onChange={handleClick}
          checked={isCheck.includes(row.id.toString())}
        />
      ),
      sortable: false,
    },
    {
      name: "Nama",
      width: "15%",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.alamat,
      sortable: true,
      width: "20%",
    },
    {
      name: "No Telp",
      width: "20%",
      selector: (row) => row.no_handphone,
      sortable: true,
    },
    {
      name: "Kode Acara",
      width: "10%",
      selector: (row) => (row.kode_acara === null ? "-" : row.kode_acara),
      sortable: true,
    },
    {
      name: "Tanggal Absen",
      width: "20%",
      selector: (row) => moment(row.created_at).format("LLL"),
      sortable: true,
    },
    {
      name: "Aksi",
      width: "10%",
      selector: (row) => (
        <button className="btn btn-primary" onClick={() => handleAdd(row.id)}>
          <i class="bx bxs-user-plus"></i>
        </button>
      ),
      sortable: true,
    },
  ];

  return (
    <DashboardLayout
      authe={props.auth}
      errors={props.errors}
      current_menu={props.page.toLowerCase()}
    >
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <PageTitle
              crumbs={`Home/Data ${props.page}`}
              title={`Data ${props.page}`}
            />
            <Card
              addData={false}
              title={"Tabel data absen"}
              downloadDta={true}
              data={isSearch ? filteredData : props.data}
            >
              <div className="mb-3">
                {isCheckAll && (
                  <div>
                    <button
                      onClick={() => handleAdd(isCheck)}
                      className="btn btn-primary "
                    >
                      Tambah ke tim pemenangan
                    </button>
                  </div>
                )}
              </div>
              <div className="d-flex gap-2 justify-content-end align-items-end px-3 mb-4">
                <FilterData
                  acara={props.acara}
                  kecamatan={props.kecamatan}
                  onAcara={(e) => handleSearch(e)}
                  onKecamatan={(e) => handleNext(e)}
                />
                <SearchData data={props.data} onText={(e) => handleSearch(e)} />
              </div>
              <DataTable
                columns={columns}
                data={isSearch ? filteredData : props.data}
                pagination
              />
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Absen;
