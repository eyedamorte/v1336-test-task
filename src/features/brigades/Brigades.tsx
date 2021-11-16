import { FC, useEffect, useState } from "react";
import { IBrigade, IPaginateConfig } from "../../interfaces/common";
import { useDispatch, useSelector } from "react-redux";
import PaginatedList from "../PaginatedList/PaginatedList";
import { getFilteredBrigades, getBrigadesIsPending } from "./BrigadesSelector";
import { filterBrigades, getBrigadesThunk } from "./BrigadesSlice";

import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";

import style from "./Brigades.module.scss";
import classNames from "classnames";
import SelectBox from "../../selectbox/Selectbox";
import { connectionFilterOptions, departmentFilterOptions } from "../../constants/filters";
import Brigade from "../Brigade/Brigade";

const Brigades: FC = () => {
  const dispatch = useDispatch();

  const isPending = useSelector(getBrigadesIsPending);
  const brigadesList = useSelector(getFilteredBrigades);

  const [conntectionFilterValue, setConntectionFilterValue] =
    useState<number>();
  const [departmentFilterValue, setDepartmentFilterValue] = useState<number>();

  useEffect(() => {
    dispatch(getBrigadesThunk());
  }, []);

  useEffect(() => {
    dispatch(
      filterBrigades({
        connection: conntectionFilterValue,
        department: departmentFilterValue,
      })
    );
  }, [conntectionFilterValue, departmentFilterValue]);

  if (isPending) {
    return <div></div>;
  } else {
    return (
      <div>
        <div className={style.filters}>
          <SelectBox
            label={"Соединение:"}
            value={conntectionFilterValue}
            allowClear
            onChange={setConntectionFilterValue}
            options={connectionFilterOptions}
            name={"connection"}
          />

          <SelectBox
            label={"Департамент:"}
            value={departmentFilterValue}
            allowClear
            onChange={setDepartmentFilterValue}
            options={departmentFilterOptions}
            name={"department"}
          />
        </div>

        <PaginatedList
          classname={style.brigades}
          name={"brigades"}
          renderItem={(brigade: IBrigade, index) => (
            <PaginatedList.Item
              classname={style.brigades__brigade}
              size={"small"}
              bordered
              title={brigade.brigade_name}
              key={index}
            >
              <Brigade brigade={brigade}></Brigade>
            </PaginatedList.Item>
          )}
          dataSource={brigadesList}
        ></PaginatedList>
      </div>
    );
  }
};

export default Brigades;
