/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useTable, useExpanded, useSortBy, usePagination } from 'react-table'
import styled from 'styled-components'

const Styles = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #dee2e6;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
      border-right: 1px solid #dee2e6;
      :last-child {
        border-right: 0;
      }
    }
  }
  thead{
    background-color: #F8F9FA;
    border-color: #dee2e6;
  }`

export default function ProdPriceTable({ city }) {
  //const [data, setData] = useState([])

  const [data, setData] = useState([])

  let categories = []
  let brands = []
  let rows = []

  useEffect(() => {
    //console.log("before fetch data")
    let url = "http://localhost:3000/data/allproducts"
    let params = {
      state: city.state,
      city: city.label
    }
    url += '?' + (new URLSearchParams(params)).toString();
    console.log(url)
    fetch(url,
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //setData(responseJson)  
        console.log(responseJson)
        setData(responseJson)

      })
  }, [city])
  console.log(data)
  if (data.length !== 0) {
    brands = data.brands
    categories = data.categories
    console.log(categories)
    rows = createRows(data)
    console.log(rows)
  }

  function createRows(data) {
    let rows = []

    categories.map(cat => {
      let prodAvgMajorCat = {}
      brands.map(brand => {
        prodAvgMajorCat[brand] = {}
        prodAvgMajorCat[brand].total = 0
        prodAvgMajorCat[brand].count = 0
      })

      let majorCatRow = {}
      let majorCategory = cat.name
      majorCatRow.majorCategory = majorCategory
      //console.log(majorCategory)
      let minorCategories = cat.minorCategories
      let minorCatRows = []
      minorCategories.map(minor => {
        // first determine the max rows to be generated for this cat/sub cat
        let maxProducts = 0
        let prodAvgMinorCat = {}
        brands.map(brand => {
          prodAvgMinorCat[brand] = {}
          if (!data[brand][majorCategory]) {
            // fixing blanks for simplifying iteration later
            data[brand][majorCategory] = {}
          }
          //let brandCategoryData = data[brand][majorCategory]
          let products = data[brand][majorCategory][minor]
          if (products) {
            maxProducts = products.length > maxProducts ? products.length : maxProducts
            prodAvgMajorCat[brand].count += products.length
            prodAvgMinorCat[brand].count = products.length
            prodAvgMinorCat[brand].total = 0
          }
          else {
            // fixing blanks for simplifying iteration later
            data[brand][majorCategory][minor] = []
            prodAvgMinorCat[brand].count = 0
          }
          console.log(brand + '\t' + prodAvgMinorCat[brand].count)
        })

        // now create objects with all the data
        // number of rows is the max rows
        let minorCatRow = {}
        minorCatRow.majorCategory = majorCategory
        minorCatRow.minorCategory = minor
        let productRows = []
        for (let i = 0; i < maxProducts; i++) {
          let productRow = {}
          productRow.majorCategory = majorCategory
          productRow.minorCategory = minor
          brands.map(brand => {
            let products = data[brand][majorCategory][minor]
            if (products.length > i) {
              productRow[brand + "prod_name"] = products[i].prod_name
              let price = products[i].avg_price
              productRow[brand + "price"] = '$' + price.toFixed(2)
              prodAvgMinorCat[brand].total += price
              prodAvgMajorCat[brand].total += price
            }
            else {
              productRow[brand + "prod_name"] = ""
              productRow[brand + "price"] = ""
            }
          })
          productRows.push(productRow)
        }

        minorCatRow.subRows = productRows
        brands.map(brand => {
          let total = prodAvgMinorCat[brand].total
          let count = prodAvgMinorCat[brand].count
          if (count > 0) {
            let avg = total / count
            minorCatRow[brand + "price"] = '$' + avg.toFixed(2)
            minorCatRow[brand + "prod_name"] = 'All'
          }
        })
        minorCatRows.push(minorCatRow)
      })
      majorCatRow.subRows = minorCatRows
      brands.map(brand => {
        let total = prodAvgMajorCat[brand].total
        let count = prodAvgMajorCat[brand].count
        if (count > 0) {
          let avg = total / count
          majorCatRow[brand + "price"] = '$' + avg.toFixed(2)
          majorCatRow[brand + "prod_name"] = 'All'
        }
      })
      rows.push(majorCatRow)
    })
    //console.log(rows)
    return rows
  }

  console.log(data)

  function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { expanded, pageIndex, pageSize }
    } = useTable({
      columns: userColumns,
      data,
      initialState: { pageIndex: 0 }
    },
      useSortBy,
      useExpanded,
      usePagination)

    // Render Data Table UI
    return (
      <>

        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

      </>

    )
  }

  let userColumns = [
    {
      // Build our expander column
      id: 'expander', // Make sure it has an ID
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
        <span {...getToggleAllRowsExpandedProps()}>
          {isAllRowsExpanded ? '-' : '+'}
        </span>
      ),
      Cell: ({ row }) =>
        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        // to build the toggle for expanding a row
        row.canExpand ? (
          <span
            {...row.getToggleRowExpandedProps({
              style: {
                // We can even use the row.depth property
                // and paddingLeft to indicate the depth
                // of the row
                paddingLeft: `${row.depth * 2}rem`,
              },
            })}
          >
            {row.isExpanded ? '-' : '+'}
          </span>
        ) : null,
    },
    {
      Header: 'Product Information',
      columns: [
        {
          Header: 'Major Category',
          accessor: 'majorCategory'
        },
        {
          Header: 'Minor Category',
          accessor: 'minorCategory'
        }
      ]
    }
  ]

  brands.map(brand => {
    userColumns.push({
      Header: brand,
      columns: [{
        Header: 'Product Name',
        accessor: brand + "prod_name"
      },
      {
        Header: 'Average Price',
        accessor: brand + "price"
      }
      ]
    })
  })

  return (
    <div>
      <div style={{ padding: 20,backgroundColor:"#F8F9FA" }}>
        <a href="/csv/ProductPriceComparison.csv" target="_blank" download>
          <button type="button">Download</button>
        </a>
      </div>
      <div>
        <Styles>
          <Table
            data={rows}
            columns={userColumns}
          />
        </Styles>
      </div>


    </div>
  )
}