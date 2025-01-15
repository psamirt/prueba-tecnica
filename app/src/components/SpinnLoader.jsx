import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
const SpinnLoader = () => (
  <Flex align="center" gap="middle">
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 100,
            color: "white"
          }}
          spin
        />
      }
    />
  </Flex>
);
export default SpinnLoader;
