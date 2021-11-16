import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import classNames from "classnames";
import { FC } from "react";
import { IBrigade } from "../../interfaces/common";

import style from "./Brigade.module.scss";

interface IBrigadeProps {
  brigade: IBrigade;
}

const Brigade: FC<IBrigadeProps> = ({ brigade }) => {
  return (
    <div className={style.description}>
      <h3>{brigade.department.name}</h3>
      <span
        className={classNames(style.description__connection, {
          [style["description__connection--without"]]:
            !brigade.connection_state,
        })}
      >
        <b>Соединение</b>:
        {!!brigade.connection_state ? (
          <>
            В норме <CheckCircleTwoTone />
          </>
        ) : (
          <>
            Нет связи <StopTwoTone />
          </>
        )}
      </span>
      <span>
        <b>Кластер</b>: {brigade.position.cluster}
      </span>
      <span>
        <b>Поле</b>: {brigade.position.field}
      </span>
      <span>
        <b>Скважина</b>: {brigade.position.well}
      </span>
    </div>
  );
};

export default Brigade;
